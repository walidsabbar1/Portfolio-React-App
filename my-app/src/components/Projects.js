// Projects.js
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

function Projects({ supabase, user }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return (
      <div className="detail" style={{ marginTop: 0 }}>
        <h1>{t.projectsTitle}</h1>
        <p className="tagline">{t.projectsTagline}</p>
        
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
    );
  }

  return (
    <div className="detail" style={{ marginTop: 0 }}>
      <h1>{t.projectsTitle}</h1>
      <p className="tagline">{t.projectsTagline}</p>
      
      <div className="projects-grid">
        {projects.length > 0 ? (
          projects.map(project => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.technologies?.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              {project.project_url && (
                <a 
                  href={project.project_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  {t.viewProject}
                </a>
              )}
            </div>
          ))
        ) : (
          <p>{t.noProjects}</p>
        )}
      </div>
    </div>
  );
}

export default Projects;