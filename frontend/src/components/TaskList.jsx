import './TaskList.css';

const STATUS_LABELS = { pending: 'Pending', in_progress: 'In progress', completed: 'Completed' };
const PRIORITY_LABELS = { low: 'Low', medium: 'Medium', high: 'High' };
const STATUS_CLASS = { pending: 'status-pending', in_progress: 'status-progress', completed: 'status-done' };
const PRIORITY_CLASS = { low: 'priority-low', medium: 'priority-medium', high: 'priority-high' };

export default function TaskList({ tasks, total, page, onPageChange, onEdit, onDelete }) {
  const pages = Math.ceil(total / 10) || 1;

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <div className="task-list-empty">
          <p>No tasks yet.</p>
          <p className="task-list-empty-hint">Create one with the button above.</p>
        </div>
      ) : (
        <>
          <ul className="task-list-ul">
            {tasks.map((task) => (
              <li key={task._id} className="task-item">
                <div className="task-item-main">
                  <h3 className="task-title">{task.title}</h3>
                  {task.description && (
                    <p className="task-desc">{task.description}</p>
                  )}
                  <div className="task-meta">
                    <span className={`task-status ${STATUS_CLASS[task.status]}`}>
                      {STATUS_LABELS[task.status]}
                    </span>
                    <span className={`task-priority ${PRIORITY_CLASS[task.priority]}`}>
                      {PRIORITY_LABELS[task.priority]}
                    </span>
                    {task.createdBy?.name && (
                      <span className="task-owner">{task.createdBy.name}</span>
                    )}
                  </div>
                </div>
                <div className="task-item-actions">
                  <button type="button" className="task-btn task-btn-edit" onClick={() => onEdit(task)}>
                    Edit
                  </button>
                  <button type="button" className="task-btn task-btn-delete" onClick={() => onDelete(task)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {pages > 1 && (
            <div className="task-pagination">
              <button
                type="button"
                className="task-page-btn"
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
              >
                Previous
              </button>
              <span className="task-page-info">
                Page {page} of {pages} ({total} total)
              </span>
              <button
                type="button"
                className="task-page-btn"
                disabled={page >= pages}
                onClick={() => onPageChange(page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
