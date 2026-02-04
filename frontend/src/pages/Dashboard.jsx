import { useState, useEffect } from 'react';
import { api } from '../api/client';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import './Dashboard.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchTasks = async (p = page) => {
    setLoading(true);
    try {
      const res = await api.tasks.list({ page: p, limit: 10 });
      setTasks(res.data.tasks);
      setTotal(res.data.total);
      setPage(p);
    } catch (err) {
      showMsg(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleCreate = async (body) => {
    try {
      await api.tasks.create(body);
      showMsg('Task created');
      setShowForm(false);
      fetchTasks(1);
    } catch (err) {
      showMsg(err.message, 'error');
      throw err;
    }
  };

  const handleUpdate = async (id, body) => {
    try {
      await api.tasks.update(id, body);
      showMsg('Task updated');
      setEditingTask(null);
      fetchTasks(page);
    } catch (err) {
      showMsg(err.message, 'error');
      throw err;
    }
  };

  const openDeleteConfirm = (task) => setDeleteConfirm({ id: task._id, title: task.title });
  const closeDeleteConfirm = () => setDeleteConfirm(null);

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    const id = deleteConfirm.id;
    setDeleteConfirm(null);
    try {
      await api.tasks.delete(id);
      showMsg('Task deleted');
      fetchTasks(page);
    } catch (err) {
      showMsg(err.message, 'error');
    }
  };

  const openEdit = (task) => setEditingTask(task);
  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="dashboard-sub">Manage your tasks</p>
        </div>
        <button type="button" className="btn-primary" onClick={() => setShowForm(true)}>
          + New task
        </button>
      </header>

      {message && (
        <div className={`toast toast-${message.type}`}>
          {message.text}
        </div>
      )}

      {(showForm || editingTask) && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? (body) => handleUpdate(editingTask._id, body) : handleCreate}
          onCancel={closeForm}
        />
      )}

      <section className="dashboard-section">
        {loading ? (
          <div className="dashboard-loading">
            <div className="loader" />
            <span>Loading tasks…</span>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            total={total}
            page={page}
            onPageChange={fetchTasks}
            onEdit={openEdit}
            onDelete={openDeleteConfirm}
          />
        )}
      </section>

      {deleteConfirm && (
        <div className="modal-backdrop" onClick={closeDeleteConfirm}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Delete task?</h3>
            <p className="modal-text">
              &ldquo;{deleteConfirm.title}&rdquo; will be permanently deleted. This cannot be undone.
            </p>
            <div className="modal-actions">
              <button type="button" className="modal-btn modal-btn-cancel" onClick={closeDeleteConfirm}>
                Cancel
              </button>
              <button type="button" className="modal-btn modal-btn-delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
