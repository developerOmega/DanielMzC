import {Router, Request, Response} from 'express';
import ProjectController from '../Controllers/ProjectController';
import ProjectControllerAdmin from '../Controllers/Admin/ProjectController';
import ProjectFilesController from '../Controllers/Api/v1/ProjectFilesController';
import { authSession } from '../Middlewares/authSession';
import { authAdmin } from '../Middlewares/authJwt';

const router = Router();
const PROJECT = new ProjectController();
const PROJECT_IN_ADMIN = new ProjectControllerAdmin();
const PROJECT_FILE = new ProjectFilesController();

router.get('/projects', PROJECT.index);
router.get('/projects/:id', PROJECT.show);

router.get('/admin_panel/projects', authSession, PROJECT_IN_ADMIN.index);
router.get('/admin_panel/projects/show/:id', authSession, PROJECT_IN_ADMIN.show);
router.get('/admin_panel/projects/new', authSession, PROJECT_IN_ADMIN.new);
router.post('/admin_panel/projects', authSession, PROJECT_IN_ADMIN.create );
router.get('/admin_panel/projects/edit/:id', authSession, PROJECT_IN_ADMIN.edit);
router.put('/admin_panel/projects/:id', authSession, PROJECT_IN_ADMIN.update);
router.delete('/admin_panel/projects/:id', authSession, PROJECT_IN_ADMIN.delete);

router.post('/api/v1/projects/:id/img', authAdmin, (req: Request, res: Response) => PROJECT_FILE.post(req, res));
router.put('/api/v1/projects/:id/img', authAdmin, (req: Request, res: Response) => PROJECT_FILE.update(req, res));
router.delete('/api/v1/projects/:id/img', authAdmin, (req: Request, res: Response) => PROJECT_FILE.delete(req, res));

export default router;
