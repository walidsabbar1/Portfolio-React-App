// About.js
import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

function About({ supabase, user }) {
  const [visitCount, setVisitCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];

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
        <h1>{t.aboutTitle}</h1>
        <p className="tagline">{t.aboutTagline}</p>
        
        <div className="skeleton-grid skeleton-grid-cards">
          {[1, 2, 3].map(i => (
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
      <h1 className="animate-slide-up">{t.aboutTitle}</h1>
      <p className="tagline animate-slide-up">{t.aboutTagline}</p>
      
      <div className="about-cards">
        <div className="about-card animate-card" style={{animationDelay: '0.1s'}}>
          <div className="about-card-icon">
            <i className='bx bx-user'></i>
          </div>
          <h2 className="about-card-title">{t.whoIAm}</h2>
          <p className="about-card-text">
            {t.whoIAmText}
          </p>
        </div>

        <div className="about-card animate-card" style={{animationDelay: '0.2s'}}>
          <div className="about-card-icon">
            <i className='bx bx-book'></i>
          </div>
          <h2 className="about-card-title">{t.education}</h2>
          <div className="about-card-content">
            <div className="education-item">
              <h3 className="about-card-subtitle">{t.educationItems.license.title}</h3>
              <p className="education-period">{t.educationItems.license.period}</p>
              <p className="about-card-text">
                {t.educationItems.license.description}
              </p>
            </div>
            
            <div className="education-item">
              <h3 className="about-card-subtitle">{t.educationItems.fullstack.title}</h3>
              <p className="education-period">{t.educationItems.fullstack.period}</p>
              <p className="about-card-text">
                {t.educationItems.fullstack.description}
              </p>
            </div>
            
            <div className="education-item">
              <h3 className="about-card-subtitle">{t.educationItems.bac.title}</h3>
              <p className="education-period">{t.educationItems.bac.period}</p>
              <p className="about-card-text">
                {t.educationItems.bac.description}
              </p>
            </div>
          </div>
        </div>

        <div className="about-card animate-card" style={{animationDelay: '0.3s'}}>
          <div className="about-card-icon">
            <i className='bx bx-briefcase'></i>
          </div>
          <h2 className="about-card-title">{t.experience}</h2>
          <div className="about-card-content">
            <div className="experience-item">
              <h3 className="about-card-subtitle">{t.experienceItems.sothema.title}</h3>
              <p className="experience-period">{t.experienceItems.sothema.period}</p>
              <p className="about-card-text">
                {t.experienceItems.sothema.description}
              </p>
            </div>
            
            <div className="experience-item">
              <h3 className="about-card-subtitle">{t.experienceItems.hackathon.title}</h3>
              <p className="experience-period">{t.experienceItems.hackathon.period}</p>
              <p className="about-card-text">
                {t.experienceItems.hackathon.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;