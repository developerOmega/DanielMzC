import { Router } from "express";
import EmailController from "../Controllers/Admin/EmailController";
import { authSession } from '../Middlewares/authSession';
import { authSuAdmin } from '../Middlewares/authSuAdmin';

const router = Router();

const EMAIL = new EmailController();

router.get('/admin_panel/emails', authSession, EMAIL.index);
router.get('/admin_panel/emails/show/:id', authSession, EMAIL.show);
router.get('/admin_panel/emails/new', [authSession, authSuAdmin], EMAIL.new);
router.post('/admin_panel/emails', [authSession, authSuAdmin], EMAIL.create);
router.delete('/admin_panel/emails/:id', [authSession, authSuAdmin], EMAIL.delete);

export default router;
