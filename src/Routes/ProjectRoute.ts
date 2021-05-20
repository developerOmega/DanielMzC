import {Router} from 'express';
import ProjectController from '../Controllers/ProjectController';
import ProjectControllerAdmin from '../Controllers/Admin/ProjectController';

const router = Router();
const PROJECT = new ProjectController();
const PROJECT_IN_ADMIN = new ProjectControllerAdmin();

router.get('/projects', PROJECT.index);
router.get('/projects/:id', PROJECT.show);

router.get('/admin/projects', PROJECT_IN_ADMIN.index);
router.get('/admin/projects/show/:id', PROJECT_IN_ADMIN.show);
router.get('/admin/projects/new', PROJECT_IN_ADMIN.new);
router.post('/admin/projects', PROJECT_IN_ADMIN.create );
router.get('/admin/projects/edit/:id', PROJECT_IN_ADMIN.edit);
router.put('/admin/projects/:id', PROJECT_IN_ADMIN.update);
router.delete('/admin/projects/:id', PROJECT_IN_ADMIN.delete);

export default router;
