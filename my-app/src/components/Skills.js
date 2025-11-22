import pfp from '../Assets/images/pfp.png';

function Skills() {
  return (
    <main className="container">
      <div className="main">
        <div className="images">
          <img src={pfp} alt="Walid Sabbar - Web Developer" className="img-w" />
        </div>
        <div className="detail">
          <h1>Skills</h1>
          <p className="tagline">Technologies and tools I work with.</p>
        </div>
      </div>
    </main>
  );
}

export default Skills;

