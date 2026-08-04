import { Router } from 'express';
import { careerController } from '../../controllers/careerController';
const router = Router();
router.get('/', careerController.getAll);
router.get('/:id', careerController.getById);
router.post('/', careerController.create);
router.put('/:id', careerController.update);
router.delete('/:id', careerController.delete);
export default router;
