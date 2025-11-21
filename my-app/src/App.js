import { useState, useCallback, lazy, Suspense, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { supabase } from './lib/supabase';
import './App.css';

// Lazy load components for code splitting
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

// Navigation configuration
const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/skills', label: 'Skills' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
];

// Routes configuration
const routes = [
  { path: '/', Component: Home },
  { path: '/about', Component: About },
  { path: '/skills', Component: Skills },
  { path: '/projects', Component: Projects },
  { path: '/contact', Component: Contact },
];

// Reusable NavLink component
const NavigationLink = ({ to, children, onNavigate }) => (
  <NavLink
    to={to}
    className={({ isActive }) => (isActive ? 'active' : '')}
    onClick={onNavigate}
  >
    {children}
  </NavLink>
);

// Header component
const Header = ({ menuOpen, setMenuOpen, user, onLogout }) => {
  const handleMenuToggle = useCallback((e) => {
    setMenuOpen(e.target.checked);
  }, [setMenuOpen]);

  const handleNavClick = useCallback(() => {
    setMenuOpen(false);
  }, [setMenuOpen]);

  return (
    <header className="container">
      <div className="page-header">
        <div className="logo">
          <NavLink to="/">Walid Sabbar</NavLink>
        </div>
        <input
          type="checkbox"
          id="click"
          checked={menuOpen}
          onChange={handleMenuToggle}
        />
        <label htmlFor="click" className="mainicon" aria-label="Toggle navigation menu">
          <div className="menu">
            <i className="bx bx-menu" aria-hidden="true"></i>
          </div>
        </label>
        <nav className={menuOpen ? 'menu-open' : ''}>
          <ul>
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <NavigationLink to={path} onNavigate={handleNavClick}>
                  {label}
                </NavigationLink>
              </li>
            ))}
            {user && (
              <li className="user-info">
                <span>Welcome, {user.email}</span>
                <button onClick={onLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

// Loading fallback component
const LoadingFallback = () => (
  <main className="container">
    <div className="main">
      <div className="detail">
        <p className="tagline">Loading...</p>
      </div>
    </div>
  </main>
);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check active sessions and subscribe to auth changes
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle logout
  const handleLogout = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  }, []);

  // Memoize routes for better performance
  const routeElements = useMemo(
    () =>
      routes.map(({ path, Component }) => (
        <Route 
          key={path} 
          path={path} 
          element={<Component supabase={supabase} user={user} />} 
        />
      )),
    [user]
  );

  if (loading) {
    return <LoadingFallback />;
  }

  return (
    <BrowserRouter>
      <Header 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        user={user} 
        onLogout={handleLogout} 
      />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>{routeElements}</Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;