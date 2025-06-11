import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Activity from '../models/Activity';
import ActivityReport from '../models/ActivityReport';
import Project from '../models/Project';
import User from '../models/User';
import { uploadFile } from '../utils/fileUpload';

class FieldOfficerController {
  // Get dashboard statistics
  async getDashboardStats(req: Request, res: Response) {
    try {
      const activeProjects = await Project.count({
        where: { status: 'active' }
      });

      const pendingReports = await ActivityReport.count({
        where: { 
          fieldOfficerId: req.user.id,
          status: 'pending'
        }
      });

      const fieldOfficers = await User.count({
        where: { role: 'field_officer' }
      });

      return res.json({
        data: {
          activeProjects,
          pendingReports,
          fieldOfficers
        }
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get projects assigned to field officer
  async getProjects(req: Request, res: Response) {
    try {
      const projects = await Project.findAll({
        where: {
          status: 'active',
          '$fieldOfficers.id$': req.user.id
        },
        include: [{
          model: User,
          as: 'fieldOfficers',
          attributes: [],
          through: { attributes: [] }
        }]
      });

      return res.json({ data: projects });
    } catch (error) {
      console.error('Error fetching projects:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get project progress over time
  async getProjectProgress(req: Request, res: Response) {
    try {
      const reports = await ActivityReport.findAll({
        where: {
          fieldOfficerId: req.user.id,
          submittedAt: {
            [Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 6))
          }
        },
        order: [['submittedAt', 'ASC']]
      });

      // Group reports by month and calculate progress
      const progressByMonth = reports.reduce((acc, report) => {
        const month = report.submittedAt.toLocaleString('default', { month: 'short' });
        if (!acc[month]) acc[month] = 0;
        acc[month]++;
        return acc;
      }, {});

      const labels = Object.keys(progressByMonth);
      const data = Object.values(progressByMonth);

      return res.json({
        data: {
          labels,
          data
        }
      });
    } catch (error) {
      console.error('Error fetching project progress:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get budget overview
  async getBudgetOverview(req: Request, res: Response) {
    try {
      const projects = await Project.findAll({
        where: {
          status: 'active',
          '$fieldOfficers.id$': req.user.id
        },
        include: [{
          model: User,
          as: 'fieldOfficers',
          attributes: [],
          through: { attributes: [] }
        }]
      });

      const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);
      const usedBudget = projects.reduce((sum, project) => sum + project.usedBudget, 0);

      return res.json({
        data: {
          used: usedBudget,
          remaining: totalBudget - usedBudget
        }
      });
    } catch (error) {
      console.error('Error fetching budget overview:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get predefined activities
  async getPredefinedActivities(req: Request, res: Response) {
    try {
      const activities = await Activity.findAll();
      return res.json({ data: activities });
    } catch (error) {
      console.error('Error fetching predefined activities:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Submit activity report
  async submitActivityReport(req: Request, res: Response) {
    try {
      const { activityId, formData } = req.body;
      const files = req.files as Express.Multer.File[];

      // Upload attachments if any
      const attachments = files ? await Promise.all(
        files.map(file => uploadFile(file))
      ) : [];

      // Create activity report
      const report = await ActivityReport.create({
        activityId,
        fieldOfficerId: req.user.id,
        formData: JSON.parse(formData),
        attachments: attachments.map(attachment => attachment.url),
        status: 'pending'
      });

      return res.json({
        data: {
          message: 'Report submitted successfully',
          report
        }
      });
    } catch (error) {
      console.error('Error submitting activity report:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new FieldOfficerController(); 