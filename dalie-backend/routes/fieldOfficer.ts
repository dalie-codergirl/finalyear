import { Router } from 'express';
import FieldOfficerController from '../controllers/FieldOfficerController';
import { authenticate } from '../middlewares/auth';
import { checkRole } from '../middlewares/checkRole';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Apply authentication and role check middleware to all routes
router.use(authenticate);
router.use(checkRole(['field_officer']));

// Dashboard routes
router.get('/dashboard/stats', FieldOfficerController.getDashboardStats);
router.get('/projects', FieldOfficerController.getProjects);
router.get('/projects/progress', FieldOfficerController.getProjectProgress);
router.get('/budget/overview', FieldOfficerController.getBudgetOverview);

// Activity routes
router.get('/activities/predefined', FieldOfficerController.getPredefinedActivities);
router.post(
  '/reports/activity',
  upload.array('attachments'),
  FieldOfficerController.submitActivityReport
);

export default router; 