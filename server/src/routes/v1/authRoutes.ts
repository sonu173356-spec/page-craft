import { Router } from 'express';
import { authController } from '../../controllers/authController';
const router = Router();
router.get('/', authController.getAll);
router.get('/:id', authController.getById);
router.post('/', authController.create);
router.put('/:id', authController.update);
router.delete('/:id', authController.delete);
export default router;
