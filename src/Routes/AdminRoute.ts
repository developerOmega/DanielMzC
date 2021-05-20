import { Router } from 'express';
import AdminsAdminController from '../Controllers/Admin/AdminController';

const router = Router()
const ADMIN_IN_ADMIN = new AdminsAdminController();

router.get('/admin/admins', ADMIN_IN_ADMIN.index);
router.get('/admin/admins/show/:id', ADMIN_IN_ADMIN.show);
router.get('/admin/admins/new', ADMIN_IN_ADMIN.new );
router.get('/admin/admins/edit/:id', ADMIN_IN_ADMIN.edit );
router.post('/admin/admins', ADMIN_IN_ADMIN.create);
router.put('/admin/admins/:id', ADMIN_IN_ADMIN.update);
router.delete('/admin/admins/:id', ADMIN_IN_ADMIN.delete);

export default router;
