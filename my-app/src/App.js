import { useState, useCallback, lazy, Suspense, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { supabase } from './lib/supabase';
import './App.css';
import pfp from './Assets/images/pfpwebp.webp';

// Lazy load components for code splitting
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

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
  { path: '/', Component: Home, showProfile: true },
  { path: '/about', Component: About, showProfile: false },
  { path: '/skills', Component: Skills, showProfile: false },
  { path: '/projects', Component: Projects, showProfile: false },
  { path: '/contact', Component: Contact, showProfile: false },
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

// Page Wrapper Component
const PageWrapper = ({ children, showProfile = false }) => (
  <div className="container">
    <div className="main">
      {children}
      {showProfile && (
        <div className="images fixed-image">
          <img src={pfp} alt="Walid Sabbar - Web Developer" className="img-w" />
        </div>
      )}
    </div>
  </div>
);

// LinkedIn-style Skeleton Loading Components
const SkeletonHome = () => (
  <PageWrapper showProfile={false}> {/* Don't show actual profile in skeleton */}
    <div className="detail home-animate">
      <div className="skeleton skeleton-text" style={{width: '100px'}}></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-tagline"></div>
      <div className="skeleton-social">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="skeleton skeleton-button"></div>
        ))}
      </div>
    </div>
    {/* Only show skeleton profile, not actual image */}
    <div className="skeleton-profile-container fixed-image">
      <div className="skeleton-profile-image"></div>
    </div>
  </PageWrapper>
);
const SkeletonAbout = () => (
  <PageWrapper>
    <div className="detail">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-tagline"></div>
      <div className="skeleton-grid skeleton-grid-cards">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="skeleton skeleton-card-medium">
            <div style={{ padding: '2rem' }}>
              <div className="skeleton skeleton-icon"></div>
              <div className="skeleton skeleton-text" style={{width: '60%'}}></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text" style={{width: '80%'}}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </PageWrapper>
);

const SkeletonSkills = () => (
  <PageWrapper>
    <div className="detail">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-tagline"></div>
      <div className="skills-minimal">
        {[1, 2, 3, 4, 5].map(category => (
          <div key={category} className="skill-category">
            <div className="skeleton skeleton-text" style={{width: '40%', height: '1.5rem'}}></div>
            <div className="skeleton-grid skeleton-grid-skills">
              {[1, 2, 3].map(skill => (
                <div key={skill} className="skeleton skeleton-card-small">
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div className="skeleton skeleton-circle-small"></div>
                      <div style={{ flex: 1 }}>
                        <div className="skeleton skeleton-text" style={{width: '60%'}}></div>
                        <div className="skeleton skeleton-text-sm" style={{width: '40%'}}></div>
                      </div>
                    </div>
                    <div className="skeleton skeleton-progress"></div>
                    <div className="skeleton skeleton-text-sm" style={{width: '20%'}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </PageWrapper>
);

const SkeletonProjects = () => (
  <PageWrapper>
    <div className="detail">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-tagline"></div>
      <div className="skeleton-grid skeleton-grid-cards">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="skeleton skeleton-card-medium">
            <div style={{ padding: '1.5rem' }}>
              <div className="skeleton skeleton-text" style={{width: '70%', marginBottom: '1rem'}}></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text" style={{width: '90%'}}></div>
              <div style={{ display: 'flex', gap: '0.5rem', margin: '1rem 0' }}>
                <div className="skeleton skeleton-text-sm" style={{width: '60px'}}></div>
                <div className="skeleton skeleton-text-sm" style={{width: '50px'}}></div>
                <div className="skeleton skeleton-text-sm" style={{width: '70px'}}></div>
              </div>
              <div className="skeleton skeleton-text-sm" style={{width: '30%'}}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </PageWrapper>
);

const SkeletonContact = () => (
  <PageWrapper>
    <div className="detail">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-tagline"></div>
      <div className="contact-container">
        <div className="skeleton skeleton-card-large">
          <div style={{ padding: '2rem' }}>
            <div className="skeleton skeleton-text" style={{width: '40%', marginBottom: '1.5rem'}}></div>
            {[1, 2, 3].map(i => (
              <div key={i} className="skeleton skeleton-contact-item"></div>
            ))}
          </div>
        </div>
        <div className="skeleton skeleton-card-large">
          <div style={{ padding: '2rem' }}>
            <div className="skeleton skeleton-text" style={{width: '60%', marginBottom: '1rem'}}></div>
            <div className="skeleton skeleton-form-input"></div>
            <div className="skeleton skeleton-form-input"></div>
            <div className="skeleton skeleton-form-textarea"></div>
            <div className="skeleton skeleton-form-input" style={{width: '50%', height: '3.5rem'}}></div>
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
);

// Loading fallback component
const LoadingFallback = ({ route }) => {
  const skeletonComponents = {
    '/': SkeletonHome,
    '/about': SkeletonAbout,
    '/skills': SkeletonSkills,
    '/projects': SkeletonProjects,
    '/contact': SkeletonContact,
  };

  const SkeletonComponent = skeletonComponents[route] || SkeletonAbout;
  
  return <SkeletonComponent />;
};

// Header component
const Header = ({ menuOpen, setMenuOpen, user, onLogout }) => {
  const handleMenuToggle = useCallback((e) => {
    setMenuOpen(e.target.checked);
  }, [setMenuOpen]);

  const handleNavClick = useCallback(() => {
    setMenuOpen(false);
  }, [setMenuOpen]);

  return (
    <header>
      <div className="header-container">
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
          <nav>
            <ul className={menuOpen ? 'menu-open' : ''}>
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
      </div>
    </header>
  );
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState('/');

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

    // Track current path for loading states
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('popstate', handleLocationChange);
    };
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

  // In App.js, update the routeElements to remove user prop from Contact
const routeElements = useMemo(
  () => routes.map(({ path, Component, showProfile }) => (
    <Route 
      key={path} 
      path={path} 
      element={
        <Suspense fallback={<LoadingFallback route={path} />}>
          <PageWrapper showProfile={showProfile}>
            {Component === Contact ? (
              <Component />
            ) : (
              <Component supabase={supabase} user={user} />
            )}
          </PageWrapper>
        </Suspense>
      } 
    />
  )),
  [user, supabase]
);

  if (loading) {
    return (
      <BrowserRouter>
        <Header 
          menuOpen={menuOpen} 
          setMenuOpen={setMenuOpen} 
          user={user} 
          onLogout={handleLogout} 
        />
        <LoadingFallback route={currentPath} />
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Header 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        user={user} 
        onLogout={handleLogout} 
      />
      <Routes>
        {routeElements}
      </Routes>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;