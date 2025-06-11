import { Request, Response, NextFunction } from 'express';
import { Controller, Get } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { DashboardService } from '../services/dashboard.service';

@Injectable()
@Controller('/dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('/stats')
  async getDashboardStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await this.dashboardService.getDashboardStats();
      res.json(stats);
    } catch (err) {
      next(err);
    }
  }

  @Get('/projects')
  async getProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const projects = await this.dashboardService.getProjects();
      res.json(projects);
    } catch (err) {
      next(err);
    }
  }

  @Get('/project-progress/:projectId?')
  async getProjectProgress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const projectId = req.params.projectId;
      const progress = await this.dashboardService.getProjectProgress(projectId);
      res.json(progress);
    } catch (err) {
      next(err);
    }
  }

  @Get('/budget/:projectId?')
  async getBudgetOverview(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const projectId = req.params.projectId;
      const budget = await this.dashboardService.getBudgetOverview(projectId);
      res.json(budget);
    } catch (err) {
      next(err);
    }
  }
} 