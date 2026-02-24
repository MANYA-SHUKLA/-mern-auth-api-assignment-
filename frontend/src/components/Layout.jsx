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
      <footer className="layout-footer">
        <span>Made with love by Manya Shukla</span>
        <a
          className="layout-footer-link"
          href="https://wa.me/8005586588"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp: 8005586588
        </a>
      </footer>
    </div>
  );
}
