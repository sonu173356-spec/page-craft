import { Router } from 'express';
import { couponController } from '../../controllers/couponController';
const router = Router();
router.get('/', couponController.getAll);
router.get('/:id', couponController.getById);
router.post('/', couponController.create);
router.put('/:id', couponController.update);
router.delete('/:id', couponController.delete);
export default router;
