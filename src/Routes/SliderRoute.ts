import { Router, Request, Response } from 'express';
import SliderController from '../Controllers/Admin/SliderController';
import SliderFilesController from '../Controllers/Api/v1/SliderFilesController';
import { authSession } from '../Middlewares/authSession';
import { authAdmin } from '../Middlewares/authJwt';

const router = Router();
const SLIDER = new SliderController();
const SLIDER_FILES = new SliderFilesController();

router.get('/admin_panel/sliders', authSession, SLIDER.index);
router.get('/admin_panel/sliders/show/:id', authSession, SLIDER.show);
router.get('/admin_panel/sliders/new', authSession, SLIDER.new);
router.post('/admin_panel/sliders', authSession, SLIDER.create);
router.get('/admin_panel/sliders/edit/:id', authSession, SLIDER.edit);
router.put('/admin_panel/sliders/:id', authSession, SLIDER.update);
router.delete('/admin_panel/sliders/:id', authSession, SLIDER.delete);


router.post('/api/v1/sliders/:id/img', authAdmin, (req: Request, res: Response) => SLIDER_FILES.post(req, res));
router.put('/api/v1/sliders/:id/img', authAdmin, (req: Request, res: Response) => SLIDER_FILES.update(req, res));
router.delete('/api/v1/sliders/:id/img', authAdmin, (req: Request, res: Response) => SLIDER_FILES.delete(req, res));

export default router;
