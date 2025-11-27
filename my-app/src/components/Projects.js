// Projects.js
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { FaArrowRight, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import InteractiveBackground from './InteractiveBackground';

function Projects({ supabase, user }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(0);
  const projectListRef = useRef(null);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Simulate loading for better UX demonstration
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [supabase]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (loading || projects.length === 0) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedProject(prev => (prev + 1) % projects.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedProject(prev => (prev - 1 + projects.length) % projects.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [loading, projects.length]);

  // Auto-scroll selected project into view
  useEffect(() => {
    if (projectListRef.current && projects.length > 0) {
      const selectedElement = projectListRef.current.children[selectedProject];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }, [selectedProject, projects.length]);

  if (loading) {
    return (
      <div className="detail" style={{ marginTop: 0 }}>
        <InteractiveBackground />
        <div className="skeleton skeleton-title" style={{width: '200px', height: '2.5rem', marginBottom: '1rem'}}></div>
        <div className="skeleton skeleton-tagline" style={{width: '300px', height: '1.5rem', marginBottom: '2rem'}}></div>
        
        <div className="projects-terminal-container">
          <div className="projects-terminal">
            {/* Left Panel - Project List Skeleton */}
            <div className="projects-list-panel">
              <div className="panel-header">
                <div className="panel-dots">
                  <span className='dot1'></span>
                  <span className='dot2'></span>
                  <span className='dot3'></span>
                </div>
                <span className="panel-title">PROJECTS LIST</span>
              </div>
              <div className="projects-list" ref={projectListRef}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="project-list-item skeleton-pulse">
                    <div className="project-list-indicator">
                      <div className="skeleton skeleton-circle-small" style={{width: '12px', height: '12px'}}></div>
                    </div>
                    <div className="project-list-content">
                      <div className="skeleton skeleton-text" style={{width: '70%', height: '1.2rem', marginBottom: '0.5rem'}}></div>
                      <div className="project-list-tech">
                        <div className="skeleton skeleton-text-sm" style={{width: '50px', height: '20px', borderRadius: '12px'}}></div>
                        <div className="skeleton skeleton-text-sm" style={{width: '40px', height: '20px', borderRadius: '12px'}}></div>
                        <div className="skeleton skeleton-text-sm" style={{width: '30px', height: '20px', borderRadius: '12px'}}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connection Cables Skeleton */}
            <div className="terminal-cables">
              <div className="cable cable-1 skeleton-pulse"></div>
              <div className="cable cable-2 skeleton-pulse"></div>
              <div className="cable cable-3 skeleton-pulse"></div>
            </div>

            {/* Right Panel - Project Details Skeleton */}
            <div className="project-details-panel">
              <div className="panel-header">
                <div className="panel-dots">
                  <span className='dot1'></span>
                  <span className='dot2'></span>
                  <span className='dot3'></span>
                </div>
                <span className="panel-title">
                  <div className="skeleton skeleton-text" style={{width: '150px', height: '1rem', display: 'inline-block'}}></div>
                </span>
              </div>
              
              <div className="project-details-content">
                {/* Project Description Skeleton */}
                <div className="project-description">
                  <div className="skeleton skeleton-text" style={{marginBottom: '0.75rem'}}></div>
                  <div className="skeleton skeleton-text" style={{width: '95%', marginBottom: '0.75rem'}}></div>
                  <div className="skeleton skeleton-text" style={{width: '90%', marginBottom: '0.75rem'}}></div>
                  <div className="skeleton skeleton-text" style={{width: '85%'}}></div>
                </div>
                
                {/* Tech Stack Skeleton */}
                <div className="project-tech-stack">
                  <div className="skeleton skeleton-text" style={{width: '120px', height: '1.2rem', marginBottom: '1rem'}}></div>
                  <div className="tech-tags-grid">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="skeleton skeleton-text" style={{
                        width: `${Math.random() * 40 + 60}px`,
                        height: '36px',
                        borderRadius: '20px'
                      }}></div>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons Skeleton */}
                <div className="project-actions">
                  <div className="skeleton skeleton-button" style={{width: '140px', height: '44px', borderRadius: '8px'}}></div>
                  <div className="skeleton skeleton-button" style={{width: '160px', height: '44px', borderRadius: '8px'}}></div>
                </div>
                
                {/* Navigation Hint Skeleton */}
                <div className="navigation-hint">
                  <div className="skeleton skeleton-text-sm" style={{width: '250px', height: '0.9rem', margin: '0 auto'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="detail" style={{ marginTop: 0 }}>
      <InteractiveBackground />
      <h1>{t.projectsTitle}</h1>
      <p className="tagline">{t.projectsTagline}</p>
      
      <div className="projects-terminal-container">
        <div className="projects-terminal">
          {/* Left Panel - Project List */}
          <div className="projects-list-panel">
            <div className="panel-header">
              <div className="panel-dots">
                <span className='dot1'></span>
                <span className='dot2'></span>
                <span className='dot3'></span>
              </div>
              <span className="panel-title">PROJECTS LIST</span>
            </div>
            <div className="projects-list" ref={projectListRef}>
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`project-list-item ${index === selectedProject ? 'selected' : ''}`}
                    onClick={() => setSelectedProject(index)}
                  >
                    <div className="project-list-indicator">
                      {index === selectedProject && <FaArrowRight className="indicator-arrow" />}
                    </div>
                    <div className="project-list-content">
                      <div className="project-list-title">{project.title}</div>
                      <div className="project-list-tech">
                        {project.technologies?.slice(0, 2).map(tech => (
                          <span key={tech} className="tech-badge">{tech}</span>
                        ))}
                        {project.technologies?.length > 2 && (
                          <span className="tech-badge">+{project.technologies.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-projects-message">
                  {t.noProjects}
                </div>
              )}
            </div>
          </div>

          {/* Connection Cables */}
          <div className="terminal-cables">
            <div className="cable cable-1"></div>
            <div className="cable cable-2"></div>
            <div className="cable cable-3"></div>
          </div>

          {/* Right Panel - Project Details */}
          <div className="project-details-panel">
            <div className="panel-header">
              <div className="panel-dots">
                <span className='dot1'></span>
                <span className='dot2'></span>
                <span className='dot3'></span>
              </div>
              <span className="panel-title">
                {projects[selectedProject]?.title || 'NO_PROJECT_SELECTED'}
              </span>
            </div>
            
            {projects.length > 0 ? (
              <div className="project-details-content">
                <div className="project-description">
                  {projects[selectedProject].description}
                </div>
                
                <div className="project-tech-stack">
                  <h4>Built With</h4>
                  <div className="tech-tags-grid">
                    {projects[selectedProject].technologies?.map(tech => (
                      <span key={tech} className="tech-tag-large">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="project-actions">
                  {projects[selectedProject].project_url && (
                    <a 
                      href={projects[selectedProject].project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-btn live-demo"
                    >
                      <FaExternalLinkAlt className="btn-icon" />
                      {t.viewProject}
                    </a>
                  )}
                  {projects[selectedProject].code_url && (
                    <a 
                      href={projects[selectedProject].code_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-btn source-code"
                    >
                      <FaCode className="btn-icon" />
                      SOURCE_CODE
                    </a>
                  )}
                </div>
                
                <div className="navigation-hint">
                  <span>↑↓ Navigate with arrow keys • ↩ Select project</span>
                </div>
              </div>
            ) : (
              <div className="no-projects-details">
                <p>{t.noProjects}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;