import {Router, Request, Response} from 'express';
import BlogController from '../Controllers/BlogController';
import BlogControllerAdmin from '../Controllers/Admin/BlogController';
import BlogFilesControllers from '../Controllers/Api/v1/BlogFilesController';
import { authSession } from '../Middlewares/authSession';
import { authAdmin } from '../Middlewares/authJwt';

const router = Router();
const BLOG = new BlogController();
const BLOG_IN_ADMIN = new BlogControllerAdmin();
const BLOG_FILE = new BlogFilesControllers();

router.get('/blog', BLOG.index );
router.get('/blog/:id', BLOG.show );

router.get('/admin_panel/blogs', authSession, BLOG_IN_ADMIN.index);
router.get('/admin_panel/blogs/show/:id', authSession, BLOG_IN_ADMIN.show);
router.get('/admin_panel/blogs/new', authSession, BLOG_IN_ADMIN.new);
router.post('/admin_panel/blogs', authSession, BLOG_IN_ADMIN.create);
router.get('/admin_panel/blogs/edit/:id', authSession, BLOG_IN_ADMIN.edit);
router.put('/admin_panel/blogs/:id', authSession, BLOG_IN_ADMIN.update);
router.delete('/admin_panel/blogs/:id', authSession, BLOG_IN_ADMIN.delete);

router.post('/api/v1/blogs/:id/img', authAdmin, (req: Request, res: Response) => BLOG_FILE.post(req, res));
router.put('/api/v1/blogs/:id/img', authAdmin, (req: Request, res: Response) => BLOG_FILE.update(req, res));
router.delete('/api/v1/blogs/:id/img', authAdmin, (req: Request, res: Response) => BLOG_FILE.delete(req, res));

export default router;