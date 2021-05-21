import { Router } from 'express';
import SectionController from '../Controllers/Api/v1/SectionController';

const router = Router();
const SECTION = new SectionController();

router.get('/api/v1/sections', SECTION.index);
router.get('/api/v1/sections/:id', SECTION.show);
router.post('/api/v1/sections', SECTION.create);
router.put('/api/v1/sections/:id', SECTION.update);
router.delete('/api/v1/sections/:id', SECTION.delete);

export default router;
