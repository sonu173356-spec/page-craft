import { Router } from 'express';
import { newsletterController } from '../../controllers/newsletterController';
const router = Router();
router.get('/', newsletterController.getAll);
router.get('/:id', newsletterController.getById);
router.post('/', newsletterController.create);
router.put('/:id', newsletterController.update);
router.delete('/:id', newsletterController.delete);
export default router;
