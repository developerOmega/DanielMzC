import {Router, Request, Response} from 'express';
import HomeController from '../Controllers/HomeController';
import ContactController from '../Controllers/ContactController';
import MeController from '../Controllers/MeController';
import LoginController from '../Controllers/Admin/LoginController';
import ErrorController from '../Controllers/ErrorController';

const router = Router();

const HOME = new HomeController();
const CONTACT = new ContactController();
const ME = new MeController();
const SESSION = new LoginController;
const ERROR = new ErrorController();

router.get('/', HOME.index );
router.get('/contact', CONTACT.index);
router.get('/me', ME.index);

router.get('/error_500', ERROR._500);

router.get('/admin_panel/login', SESSION.index);
router.post('/admin_panel/login', SESSION.create);
router.delete('/admin_panel/logout', SESSION.delete);

router.post('/contact', (req: Request, res: Response) => { CONTACT.create(req, res) });

export default router;
