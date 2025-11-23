// Layout.js
import { Outlet } from 'react-router-dom';
import pfp from '../Assets/images/pfp.png';

function Layout() {
  return (
    <div className="container">
      <div className="main">
        <Outlet />
        <div className="images fixed-image">
          <div className="profile-frame">
            <img src={pfp} alt="Walid Sabbar - Web Developer" className="img-w" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;