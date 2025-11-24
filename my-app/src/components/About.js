// About.js
import { useEffect, useState } from 'react';

function About({ supabase, user }) {
  const [visitCount, setVisitCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const { data, error } = await supabase
          .from('page_visits')
          .insert([
            {
              page_name: 'about',
              user_id: user?.id || null,
              visited_at: new Date().toISOString()
            }
          ]);

        if (error) throw error;

        const { count, error: countError } = await supabase
          .from('page_visits')
          .select('*', { count: 'exact', head: true })
          .eq('page_name', 'about');

        if (countError) throw countError;

        setVisitCount(count || 0);
      } catch (error) {
        console.error('Error tracking visit:', error.message);
      } finally {
        setLoading(false);
      }
    };

    // Simulate loading for better UX demonstration
    setTimeout(() => {
      trackVisit();
    }, 800);
    
    document.body.classList.add('page-loaded');
  }, [supabase, user]);

  if (loading) {
    return (
      <div className="detail" style={{ marginTop: 0 }}>
        <h1>About Me</h1>
        <p className="tagline">Learn more about my journey and passion for web development.</p>
        
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
    );
  }

  return (
    <div className="detail" style={{ marginTop: 0 }}>
      <h1 className="animate-slide-up">About Me</h1>
      <p className="tagline animate-slide-up">Learn more about my journey and passion for web development.</p>
      
      <div className="about-cards">
        <div className="about-card animate-card" style={{animationDelay: '0.1s'}}>
          <div className="about-card-icon">
            <i className='bx bx-user'></i>
          </div>
          <h2 className="about-card-title">Who I Am</h2>
          <p className="about-card-text">
            I'm a passionate web developer with experience in modern technologies 
            including React, Node.js, and various database systems. I love creating 
            efficient, scalable, and user-friendly applications. My journey in web development 
            has been driven by curiosity and a desire to build solutions that make a difference.
          </p>
        </div>

        <div className="about-card animate-card" style={{animationDelay: '0.2s'}}>
          <div className="about-card-icon">
            <i className='bx bx-book'></i>
          </div>
          <h2 className="about-card-title">Education</h2>
          <div className="about-card-content">
            <h3 className="about-card-subtitle">Licence Professionnelle</h3>
            <p className="about-card-text">
              Currently pursuing my professional degree, focusing on web development 
              and software engineering. Gaining hands-on experience with industry-standard 
              technologies and best practices.
            </p>
          </div>
        </div>

        <div className="about-card animate-card" style={{animationDelay: '0.3s'}}>
          <div className="about-card-icon">
            <i className='bx bx-heart'></i>
          </div>
          <h2 className="about-card-title">Personal Information</h2>
          <div className="about-card-content">
            <p className="about-card-text">
              Beyond coding, I'm passionate about continuous learning and staying up-to-date 
              with the latest trends in web development. I enjoy sharing knowledge through 
              content creation and contributing to the developer community.
            </p>
            <p className="about-card-text">
              When I'm not coding, you can find me exploring new technologies, working on 
              personal projects, or sharing insights on my social media channels.
            </p>
          </div>
        </div>
        
        <div className="about-card about-card-stats animate-card" style={{animationDelay: '0.4s'}}>
          <div className="about-card-icon">
            <i className='bx bx-bar-chart-alt-2'></i>
          </div>
          <h2 className="about-card-title">Statistics</h2>
          <div className="about-card-content">
            <div className="stat-item">
              <span className="stat-number">{visitCount}</span>
              <span className="stat-label">About Page Views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
