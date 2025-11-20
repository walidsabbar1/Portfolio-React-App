function Home() {
  return (
    <main className="container">
      <div className="main">
        <div className="images">
          <img src="/pfp.png" alt="Walid Sabbar - Web Developer" className="img-w" />
        </div>
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
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;

