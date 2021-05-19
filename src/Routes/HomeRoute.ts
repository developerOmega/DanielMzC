import {Router} from 'express';
import HomeController from '../Controllers/HomeController';

const router = Router();
const HOME = new HomeController();

router.get('/', HOME.index );

export default router;
