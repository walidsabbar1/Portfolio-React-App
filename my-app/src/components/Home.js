import { useNavigate } from 'react-router-dom';
import cv from '../Assets/Walid_Sabbar_cv.pdf';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="detail">
      <h3>Hi, I'm</h3>
      <h1><span>Walid</span> Sabbar</h1>
      <p className="tagline">Web Developer & Creative Problem Solver</p>
      <div className="social">
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
        <a href={cv} download="Walid_Sabbar_CV.pdf" className="download-cv" aria-label="Download CV">
            <i className='bx bx-download download-icon' aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
}

export default Home;