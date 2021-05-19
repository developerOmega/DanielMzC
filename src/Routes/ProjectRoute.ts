import {Router} from 'express';
import ProjectController from '../Controllers/ProjectController';

const router = Router();
const PROJECT = new ProjectController();

router.get('/projects', PROJECT.index);
router.get('/projects/:id', PROJECT.show);

export default router;
