import { useState, useEffect } from 'react';

function Projects({ supabase, user }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
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
      <main className="container">
        <div className="main">
          <div className="detail">
            <h1>Projects</h1>
            <p className="tagline">Loading projects...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="main">
        <div className="detail">
          <h1>Projects</h1>
          <p className="tagline">Check out my latest work and projects.</p>
          
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
                      View Project
                    </a>
                  )}
                </div>
              ))
            ) : (
              <p>No projects found. Check back soon!</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Projects;