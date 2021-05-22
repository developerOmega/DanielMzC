import {Router, Request, Response} from 'express';
import ProjectController from '../Controllers/ProjectController';
import ProjectControllerAdmin from '../Controllers/Admin/ProjectController';
import ProjectFilesController from '../Controllers/Api/v1/ProjectFilesController';

const router = Router();
const PROJECT = new ProjectController();
const PROJECT_IN_ADMIN = new ProjectControllerAdmin();
const PROJECT_FILE = new ProjectFilesController();

router.get('/projects', PROJECT.index);
router.get('/projects/:id', PROJECT.show);

router.get('/admin_panel/projects', PROJECT_IN_ADMIN.index);
router.get('/admin_panel/projects/show/:id', PROJECT_IN_ADMIN.show);
router.get('/admin_panel/projects/new', PROJECT_IN_ADMIN.new);
router.post('/admin_panel/projects', PROJECT_IN_ADMIN.create );
router.get('/admin_panel/projects/edit/:id', PROJECT_IN_ADMIN.edit);
router.put('/admin_panel/projects/:id', PROJECT_IN_ADMIN.update);
router.delete('/admin_panel/projects/:id', PROJECT_IN_ADMIN.delete);

router.post('/api/v1/projects/:id/img', (req: Request, res: Response) => PROJECT_FILE.post(req, res));
router.put('/api/v1/projects/:id/img', (req: Request, res: Response) => PROJECT_FILE.update(req, res));
router.delete('/api/v1/projects/:id/img', (req: Request, res: Response) => PROJECT_FILE.delete(req, res));

export default router;
