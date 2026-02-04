import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Nav.css';

export default function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/dashboard" className="nav-brand">
          <span className="nav-logo">TaskFlow</span>
        </Link>
        <div className="nav-right">
          <span className="nav-user">
            {user?.name}
            {user?.role === 'admin' && <span className="nav-badge">Admin</span>}
          </span>
          <button type="button" className="nav-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}
