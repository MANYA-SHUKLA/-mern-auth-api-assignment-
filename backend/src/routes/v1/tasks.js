import express from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../../controllers/taskController.js';
import { protect } from '../../middleware/auth.js';
import {
  createTaskRules,
  updateTaskRules,
  taskIdParam,
  validate,
} from '../../validators/taskValidator.js';

const router = express.Router();

router.use(protect);

router.get('/', getTasks);
router.post('/', createTaskRules, validate, createTask);
router.get('/:id', taskIdParam, validate, getTaskById);
router.put('/:id', updateTaskRules, validate, updateTask);
router.delete('/:id', taskIdParam, validate, deleteTask);

export default router;
