import Task from '../models/Task.js';
import { AppError } from '../middleware/errorHandler.js';

export const getTasks = async (req, res, next) => {
  try {
    const isAdmin = req.user.role === 'admin';
    const filter = isAdmin ? {} : { createdBy: req.user.id };
    const { status, priority, page = 1, limit = 10 } = req.query;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    const skip = (Number(page) - 1) * Number(limit);
    const [tasks, total] = await Promise.all([
      Task.find(filter)
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Task.countDocuments(filter),
    ]);
    res.status(200).json({
      success: true,
      data: { tasks, total, page: Number(page), pages: Math.ceil(total / Number(limit)) },
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('createdBy', 'name email');
    if (!task) throw new AppError('Task not found', 404);
    if (req.user.role !== 'admin' && task.createdBy._id.toString() !== req.user.id) {
      throw new AppError('Not authorized to access this task', 403);
    }
    res.status(200).json({ success: true, data: { task } });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      createdBy: req.user.id,
    });
    const populated = await Task.findById(task._id).populate('createdBy', 'name email');
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: { task: populated },
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) throw new AppError('Task not found', 404);
    if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user.id) {
      throw new AppError('Not authorized to update this task', 403);
    }
    Object.assign(task, req.body);
    await task.save();
    const populated = await Task.findById(task._id).populate('createdBy', 'name email');
    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: { task: populated },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) throw new AppError('Task not found', 404);
    if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user.id) {
      throw new AppError('Not authorized to delete this task', 403);
    }
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
