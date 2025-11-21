import { useEffect, useState } from 'react';

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
        <div className="detail">
          <h1>About Me</h1>
          <p className="tagline">Learn more about my journey and passion for web development.</p>
          
          <div className="about-content">
            <p>
              I'm a passionate web developer with experience in modern technologies 
              including React, Node.js, and various database systems. I love creating 
              efficient, scalable, and user-friendly applications.
            </p>
            
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