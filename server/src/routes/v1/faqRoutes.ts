import { Router } from 'express';
import { faqController } from '../../controllers/faqController';
const router = Router();
router.get('/', faqController.getAll);
router.get('/:id', faqController.getById);
router.post('/', faqController.create);
router.put('/:id', faqController.update);
router.delete('/:id', faqController.delete);
export default router;
