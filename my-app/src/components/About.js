import { useEffect, useState } from 'react';
import pfp from '../Assets/images/pfp.png';

function About({ supabase, user }) {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Track page visit
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

        // Get total visits count
        const { count, error: countError } = await supabase
          .from('page_visits')
          .select('*', { count: 'exact', head: true })
          .eq('page_name', 'about');

        if (countError) throw countError;

        setVisitCount(count || 0);
      } catch (error) {
        console.error('Error tracking visit:', error.message);
      }
    };

    trackVisit();
  }, [supabase, user]);

  return (
    <main className="container">
      <div className="main">
        <div className="images">
          <img src={pfp} alt="Walid Sabbar - Web Developer" className="img-w" />
        </div>
        <div className="detail">
          <h1>About Me</h1>
          <p className="tagline">Learn more about my journey and passion for web development.</p>
          
          <div className="about-content">
            <section className="about-section">
              <h2>Who I Am</h2>
              <p>
                I'm a passionate web developer with experience in modern technologies 
                including React, Node.js, and various database systems. I love creating 
                efficient, scalable, and user-friendly applications. My journey in web development 
                has been driven by curiosity and a desire to build solutions that make a difference.
              </p>
            </section>

            <section className="about-section">
              <h2>Education</h2>
              <div className="education-item">
                <h3>Licence Professionnelle</h3>
                <p className="education-details">
                  Currently pursuing my professional degree, focusing on web development 
                  and software engineering. Gaining hands-on experience with industry-standard 
                  technologies and best practices.
                </p>
              </div>
            </section>

            <section className="about-section">
              <h2>Personal Information</h2>
              <div className="personal-info">
                <p>
                  Beyond coding, I'm passionate about continuous learning and staying up-to-date 
                  with the latest trends in web development. I enjoy sharing knowledge through 
                  content creation and contributing to the developer community.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, working on 
                  personal projects, or sharing insights on my social media channels.
                </p>
              </div>
            </section>
            
            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">{visitCount}</span>
                <span className="stat-label">About Page Views</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;