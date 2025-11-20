import { useState, useCallback, lazy, Suspense, useMemo } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

// Lazy load components for code splitting (React 19 optimization)
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
const Header = ({ menuOpen, setMenuOpen }) => {
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

  // Memoize routes for better performance
  const routeElements = useMemo(
    () =>
      routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      )),
    []
  );

  return (
    <BrowserRouter>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>{routeElements}</Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
