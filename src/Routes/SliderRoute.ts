import { Router, Request, Response } from 'express';
import SliderController from '../Controllers/Admin/SliderController';
import SliderFilesController from '../Controllers/Api/v1/SliderFilesController';

const router = Router();
const SLIDER = new SliderController();
const SLIDER_FILES = new SliderFilesController();

router.get('/admin_panel/sliders', SLIDER.index);
router.get('/admin_panel/sliders/show/:id', SLIDER.show);
router.get('/admin_panel/sliders/new', SLIDER.new);
router.post('/admin_panel/sliders', SLIDER.create);
router.get('/admin_panel/sliders/edit/:id', SLIDER.edit);
router.put('/admin_panel/sliders/:id', SLIDER.update);
router.delete('/admin_panel/sliders/:id', SLIDER.delete);


router.post('/api/v1/sliders/:id/img', (req: Request, res: Response) => SLIDER_FILES.post(req, res));
router.put('/api/v1/sliders/:id/img', (req: Request, res: Response) => SLIDER_FILES.update(req, res));
router.delete('/api/v1/sliders/:id/img', (req: Request, res: Response) => SLIDER_FILES.delete(req, res));

export default router;
