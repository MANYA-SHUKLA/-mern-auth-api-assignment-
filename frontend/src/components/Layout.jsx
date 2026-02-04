import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Nav from './Nav';
import './Layout.css';

export default function Layout() {
  const { user } = useAuth();
  return (
    <div className="layout">
      {user && <Nav />}
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}
