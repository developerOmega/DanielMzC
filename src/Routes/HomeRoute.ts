import {Router} from 'express';
import HomeController from '../Controllers/HomeController';
import ContactController from '../Controllers/ContactController';
import MeController from '../Controllers/MeController';

const router = Router();

const HOME = new HomeController();
const CONTACT = new ContactController();
const ME = new MeController();

router.get('/', HOME.index );
router.get('/contact', CONTACT.index);
router.get('/me', ME.index);

export default router;
