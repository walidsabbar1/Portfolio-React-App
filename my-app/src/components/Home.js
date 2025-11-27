// Home.js
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import cv from '../Assets/Walid_Sabbar_cv.pdf';
import InteractiveBackground from './InteractiveBackground';

function Home() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    document.body.classList.add('page-loaded');
  }, []);

  // Loading state
  const loading = false; // This would typically come from props or state

  if (loading) {
    return (
      <div className="detail home-animate">
        <div className="skeleton skeleton-text" style={{
          width: '150px', 
          height: '1.4rem', 
          marginBottom: '0.25rem'
        }}></div>
        
        <div className="skeleton skeleton-title" style={{
          height: '3.5rem',
          marginBottom: '0.75rem',
          width: '300px'
        }}></div>
        
        <div className="skeleton skeleton-tagline" style={{
          width: '400px',
          height: '1.2rem',
          marginBottom: '1.25rem'
        }}></div>
        
        <div className="social">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="skeleton skeleton-button" style={{
              width: '3.2rem',
              height: '3.2rem',
              borderRadius: '8px'
            }}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="detail home-animate">
      <InteractiveBackground />
      <h3 className="animate-slide-up home-intro">{t.welcome}</h3>
      
      <h1 className="animate-slide-left home-title">
        <span className="name-highlight">Walid</span> Sabbar
      </h1>
      
      <p className="tagline animate-scale-in home-tagline">
        {t.tagline}
      </p>
      
      <div className="social animate-fade-in home-social">
        <a 
          href="https://www.linkedin.com/in/walid-sabbar-5262152a0/" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="LinkedIn Profile"
          className="social-item home-social-item"
        >
          <i className='bx bxl-linkedin' aria-hidden="true"></i>
        </a>
        
        <a 
          href="https://github.com/walidsabbar1" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="GitHub Profile"
          className="social-item home-social-item"
        >
          <i className='bx bxl-github' aria-hidden="true"></i>
        </a>
        
        <a 
          href="https://www.youtube.com/channel/UCVnf6C2Qn1nrAYKlFgIbhiw" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="YouTube Channel"
          className="social-item home-social-item"
        >
          <i className='bx bxl-youtube' aria-hidden="true"></i>
        </a>
        
        <a 
          href="https://www.instagram.com/walid_sabbar1" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Instagram Profile"
          className="social-item home-social-item"
        >
          <i className='bx bxl-instagram' aria-hidden="true"></i>
        </a>
        
        <a 
          href={cv} 
          download="Walid_Sabbar_CV.pdf" 
          className="download-cv social-item home-social-item" 
          aria-label={t.downloadCv}
        >
          <i className='bx bx-download download-icon' aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
}

export default Home;