import { Router } from 'express';
import AdminsAdminController from '../Controllers/Admin/AdminController';
import { authSession } from '../Middlewares/authSession';
import { authSuAdmin } from '../Middlewares/authSuAdmin';

const router = Router()
const ADMIN_IN_ADMIN = new AdminsAdminController();

router.get('/admin_panel/admins', [authSession, authSuAdmin], ADMIN_IN_ADMIN.index);
router.get('/admin_panel/admins/show/:id', [authSession, authSuAdmin], ADMIN_IN_ADMIN.show);
router.get('/admin_panel/admins/new', [authSession, authSuAdmin], ADMIN_IN_ADMIN.new );
router.get('/admin_panel/admins/edit/:id', [authSession, authSuAdmin], ADMIN_IN_ADMIN.edit );
router.post('/admin_panel/admins', [authSession, authSuAdmin], ADMIN_IN_ADMIN.create);
router.put('/admin_panel/admins/:id', [authSession, authSuAdmin], ADMIN_IN_ADMIN.update);
router.delete('/admin_panel/admins/:id', [authSession, authSuAdmin], ADMIN_IN_ADMIN.delete);

export default router;
