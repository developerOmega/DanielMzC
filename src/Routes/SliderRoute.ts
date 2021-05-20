import { Router } from 'express';
import SliderController from '../Controllers/Admin/SliderController';

const router = Router();
const SLIDER = new SliderController();

router.get('/admin_panel/sliders', SLIDER.index);
router.get('/admin_panel/sliders/show/:id', SLIDER.show);
router.get('/admin_panel/sliders/new', SLIDER.new);
router.post('/admin_panel/sliders', SLIDER.create);
router.get('/admin_panel/sliders/edit/:id', SLIDER.edit);
router.put('/admin_panel/sliders/:id', SLIDER.update);
router.delete('/admin_panel/sliders/:id', SLIDER.delete);

export default router;
