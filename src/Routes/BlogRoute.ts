import {Router} from 'express';
import BlogController from '../Controllers/BlogController';

const router = Router();
const BLOG = new BlogController();

router.get('/blog', BLOG.index );
router.get('/blog/:id', BLOG.show );

export default router;