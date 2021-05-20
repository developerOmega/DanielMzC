import { Router } from 'express';
import SliderController from '../Controllers/Admin/SliderController';

const router = Router();
const SLIDER = new SliderController();

router.get('/admin/sliders', SLIDER.index);
router.get('/admin/sliders/show/:id', SLIDER.show);
router.get('/admin/sliders/new', SLIDER.new);
router.post('/admin/sliders', SLIDER.create);
router.get('/admin/sliders/edit/:id', SLIDER.edit);
router.put('/admin/sliders/:id', SLIDER.update);
router.delete('/admin/sliders/:id', SLIDER.delete);

export default router;
