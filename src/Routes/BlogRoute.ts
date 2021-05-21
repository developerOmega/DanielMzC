import {Router} from 'express';
import BlogController from '../Controllers/BlogController';
import BlogControllerAdmin from '../Controllers/Admin/BlogController';
import BlogFilesControllers from '../Controllers/Api/v1/BlogFilesController';

const router = Router();
const BLOG = new BlogController();
const BLOG_IN_ADMIN = new BlogControllerAdmin();
const BLOG_FILE = new BlogFilesControllers();

router.get('/blog', BLOG.index );
router.get('/blog/:id', BLOG.show );

router.get('/admin_panel/blogs', BLOG_IN_ADMIN.index);
router.get('/admin_panel/blogs/show/:id', BLOG_IN_ADMIN.show);
router.get('/admin_panel/blogs/new', BLOG_IN_ADMIN.new);
router.post('/admin_panel/blogs', BLOG_IN_ADMIN.create);
router.get('/admin_panel/blogs/edit/:id', BLOG_IN_ADMIN.edit);
router.put('/admin_panel/blogs/:id', BLOG_IN_ADMIN.update);
router.delete('/admin_panel/blogs/:id', BLOG_IN_ADMIN.delete);

router.post('/api/v1/blogs/:id/img', BLOG_FILE.post);
router.put('/api/v1/blogs/:id/img', BLOG_FILE.update);
router.delete('/api/v1/blogs/:id/img', BLOG_FILE.delete);

export default router;