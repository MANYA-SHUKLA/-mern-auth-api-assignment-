import express from 'express';
import authRoutes from './auth.js';
import taskRoutes from './tasks.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);

router.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API v1 is running' });
});

export default router;
