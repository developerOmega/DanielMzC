import { Router, Request, Response } from 'express';
import SectionController from '../Controllers/Api/v1/SectionController';
import SectionFilesController from '../Controllers/Api/v1/SectionFilessController';

const router = Router();
const SECTION = new SectionController();
const SECTION_FILE = new SectionFilesController();

router.get('/api/v1/sections', SECTION.index);
router.get('/api/v1/sections/:id', SECTION.show);
router.post('/api/v1/sections', SECTION.create);
router.put('/api/v1/sections/:id', SECTION.update);
router.delete('/api/v1/sections/:id', SECTION.delete);

router.post('/api/v1/sections/:id/img', (req: Request, res: Response) => SECTION_FILE.post(req, res));
router.put('/api/v1/sections/:id/img', (req: Request, res: Response) => SECTION_FILE.update(req, res));
router.delete('/api/v1/sections/:id/img', (req: Request, res: Response) => SECTION_FILE.delete(req, res));

export default router;
