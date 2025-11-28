// About.js
import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import InteractiveBackground from './InteractiveBackground';

function About({ supabase, user }) {
  const [visitCount, setVisitCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
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
        <InteractiveBackground />
        <div className="skeleton skeleton-title" style={{width: '200px', height: '2.5rem', marginBottom: '1rem'}}></div>
        <div className="skeleton skeleton-tagline" style={{width: '300px', height: '1.5rem', marginBottom: '2rem'}}></div>
        
        <div className="about-cards">
          {/* Who I Am Card Skeleton */}
          <div className="about-card">
            <div className="skeleton skeleton-icon" style={{width: '3.5rem', height: '3.5rem', borderRadius: '10px', marginBottom: '1.25rem'}}></div>
            <div className="skeleton skeleton-text" style={{width: '60%', height: '1.75rem', marginBottom: '1rem'}}></div>
            <div className="skeleton skeleton-text" style={{marginBottom: '0.75rem'}}></div>
            <div className="skeleton skeleton-text" style={{width: '95%', marginBottom: '0.75rem'}}></div>
            <div className="skeleton skeleton-text" style={{width: '90%', marginBottom: '0.75rem'}}></div>
            <div className="skeleton skeleton-text" style={{width: '85%'}}></div>
          </div>

          {/* Education Card Skeleton */}
          <div className="about-card">
            <div className="skeleton skeleton-icon" style={{width: '3.5rem', height: '3.5rem', borderRadius: '10px', marginBottom: '1.25rem'}}></div>
            <div className="skeleton skeleton-text" style={{width: '50%', height: '1.75rem', marginBottom: '1.5rem'}}></div>
            
            <div className="about-card-content">
              {[1, 2, 3].map(i => (
                <div key={i} className="education-item" style={{marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(26, 29, 33, 0.1)'}}>
                  <div className="skeleton skeleton-text" style={{width: '70%', height: '1.25rem', marginBottom: '0.5rem'}}></div>
                  <div className="skeleton skeleton-text-sm" style={{width: '40%', height: '1rem', marginBottom: '0.75rem'}}></div>
                  <div className="skeleton skeleton-text" style={{marginBottom: '0.5rem', width: '95%'}}></div>
                  <div className="skeleton skeleton-text" style={{width: '90%'}}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Card Skeleton */}
          <div className="about-card">
            <div className="skeleton skeleton-icon" style={{width: '3.5rem', height: '3.5rem', borderRadius: '10px', marginBottom: '1.25rem'}}></div>
            <div className="skeleton skeleton-text" style={{width: '60%', height: '1.75rem', marginBottom: '1.5rem'}}></div>
            
            <div className="about-card-content">
              {[1, 2].map(i => (
                <div key={i} className="experience-item" style={{marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(26, 29, 33, 0.1)'}}>
                  <div className="skeleton skeleton-text" style={{width: '80%', height: '1.25rem', marginBottom: '0.5rem'}}></div>
                  <div className="skeleton skeleton-text-sm" style={{width: '35%', height: '1rem', marginBottom: '0.75rem'}}></div>
                  <div className="skeleton skeleton-text" style={{marginBottom: '0.5rem', width: '95%'}}></div>
                  <div className="skeleton skeleton-text" style={{width: '85%'}}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }



  const renderCardContent = (type) => {
    switch (type) {
      case 'whoIAm':
        return (
          <p className="about-card-text">
            {t.whoIAmText}
          </p>
        );
      case 'education':
        return (
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
        );
      case 'experience':
        return (
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
        );
      default:
        return null;
    }
  };

  const getTitle = (type) => {
    switch (type) {
      case 'whoIAm': return t.whoIAm;
      case 'education': return t.education;
      case 'experience': return t.experience;
      default: return '';
    }
  };

  return (
    <div className="detail" style={{ marginTop: 0 }}>
      <InteractiveBackground />
      <h1 className="animate-slide-up">{t.aboutTitle}</h1>
      <p className="tagline animate-slide-up">{t.aboutTagline}</p>
      
      <div className="about-cards">
        <div className="about-card animate-card" style={{animationDelay: '0.1s'}}>
          <div className="about-card-icon">
            <i className='bx bx-user'></i>
          </div>
          <h2 className="about-card-title">{t.whoIAm}</h2>
          <div className="card-peek-container">
            {renderCardContent('whoIAm')}
            <div className="fade-overlay"></div>
          </div>
          <button className="read-more-btn" onClick={() => setSelectedCard('whoIAm')}>
            {t.readMore || 'Read More'}
          </button>
        </div>

        <div className="about-card animate-card" style={{animationDelay: '0.2s'}}>
          <div className="about-card-icon">
            <i className='bx bx-book'></i>
          </div>
          <h2 className="about-card-title">{t.education}</h2>
          <div className="card-peek-container">
            {renderCardContent('education')}
            <div className="fade-overlay"></div>
          </div>
          <button className="read-more-btn" onClick={() => setSelectedCard('education')}>
            {t.readMore || 'Read More'}
          </button>
        </div>

        <div className="about-card animate-card" style={{animationDelay: '0.3s'}}>
          <div className="about-card-icon">
            <i className='bx bx-briefcase'></i>
          </div>
          <h2 className="about-card-title">{t.experience}</h2>
          <div className="card-peek-container">
            {renderCardContent('experience')}
            <div className="fade-overlay"></div>
          </div>
          <button className="read-more-btn" onClick={() => setSelectedCard('experience')}>
            {t.readMore || 'Read More'}
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedCard && (
        <div className="modal-overlay" onClick={() => setSelectedCard(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedCard(null)}>
              <i className='bx bx-x'></i>
            </button>
            <h2 className="modal-title">{getTitle(selectedCard)}</h2>
            <div className="modal-body">
              {renderCardContent(selectedCard)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default About;