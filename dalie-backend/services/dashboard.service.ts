import { Injectable } from '@decorators/di';
import { Project } from '../models/project.model';
import { User } from '../models/user.model';
import { Report } from '../models/report.model';
import { Budget } from '../models/budget.model';
import { sequelize } from '../models';

@Injectable()
export class DashboardService {
  async getDashboardStats() {
    const [activeProjects, pendingReports, fieldOfficers] = await Promise.all([
      Project.count({ where: { status: 'active' } }),
      Report.count({ where: { status: 'pending' } }),
      User.count({ where: { role: 'field_officer' } })
    ]);

    return {
      activeProjects,
      pendingReports,
      fieldOfficers
    };
  }

  async getProjects() {
    return await Project.findAll({
      attributes: ['id', 'name', 'status', 'startDate', 'endDate'],
      order: [['startDate', 'DESC']]
    });
  }

  async getProjectProgress(projectId?: string) {
    const whereClause = projectId ? { projectId } : {};
    
    const progressData = await Report.findAll({
      where: whereClause,
      attributes: [
        [sequelize.fn('DATE_TRUNC', 'week', sequelize.col('createdAt')), 'week'],
        [sequelize.fn('AVG', sequelize.col('progress')), 'progress']
      ],
      group: [sequelize.fn('DATE_TRUNC', 'week', sequelize.col('createdAt'))],
      order: [[sequelize.fn('DATE_TRUNC', 'week', sequelize.col('createdAt')), 'ASC']],
      raw: true
    });

    return {
      labels: progressData.map(d => d.week),
      data: progressData.map(d => parseFloat(d.progress))
    };
  }

  async getBudgetOverview(projectId?: string) {
    const whereClause = projectId ? { projectId } : {};
    
    const budgetData = await Budget.findOne({
      where: whereClause,
      attributes: [
        [sequelize.fn('SUM', sequelize.col('allocated')), 'total'],
        [sequelize.fn('SUM', sequelize.col('used')), 'used']
      ],
      raw: true
    });

    const total = parseFloat(budgetData?.total || '0');
    const used = parseFloat(budgetData?.used || '0');

    return {
      used,
      remaining: total - used
    };
  }
} 