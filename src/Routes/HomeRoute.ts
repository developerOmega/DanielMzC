import {Router} from 'express';
import HomeController from '../Controllers/HomeController';
import ContactController from '../Controllers/ContactController';
import MeController from '../Controllers/MeController';
import LoginController from '../Controllers/Admin/LoginController';

const router = Router();

const HOME = new HomeController();
const CONTACT = new ContactController();
const ME = new MeController();
const SESSION = new LoginController;

router.get('/', HOME.index );
router.get('/contact', CONTACT.index);
router.get('/me', ME.index);

router.get('/admin_panel/login', SESSION.index);
router.post('/admin_panel/login', SESSION.create);
router.delete('/admin_panel/logout', SESSION.delete);

export default router;
