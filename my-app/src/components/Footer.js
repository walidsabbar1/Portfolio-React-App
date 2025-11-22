import { NavLink } from 'react-router-dom';
import cv from '../Assets/Walid_Sabbar_cv.pdf';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Walid Sabbar</h3>
            <p className="footer-tagline">Web Developer & Creative Problem Solver</p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <nav className="footer-nav">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/skills">Skills</NavLink>
              <NavLink to="/projects">Projects</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </nav>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-social">
              <a href="https://www.linkedin.com/in/walid-sabbar-5262152a0/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                <i className='bx bxl-linkedin' aria-hidden="true"></i>
              </a>
              <a href="https://github.com/walidsabbar1" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                <i className='bx bxl-github' aria-hidden="true"></i>
              </a>
              <a href="https://www.youtube.com/channel/UCVnf6C2Qn1nrAYKlFgIbhiw" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel">
                <i className='bx bxl-youtube' aria-hidden="true"></i>
              </a>
              <a href="https://www.instagram.com/walid_sabbar1" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile">
                <i className='bx bxl-instagram' aria-hidden="true"></i>
              </a>
              <a href={cv} download="Walid_Sabbar_CV.pdf" className="footer-cv" aria-label="Download CV">
                <i className='bx bx-download' aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Walid Sabbar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

