import './navbar.scss';
import { useState } from 'react';
import { FaBars, FaTimes, FaShoppingCart, FaUser, FaSnapchatGhost } from 'react-icons/fa';
import { FiFacebook, FiInstagram, FiYoutube, FiMessageCircle, FiGlobe } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <>
      <nav className="navbar">
        <div className="social-section">
          <button className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className="lang-icon mobile-only" title="Change Language">
            <FiGlobe />
          </div>

          <span className="label hide-on-mobile" onClick={toggleMenu}>
            Social Media
          </span>

          <div className={`social-menu ${menuOpen ? 'open' : ''}`}>
            {[
              { icon: <FiFacebook />, label: 'Facebook' },
              { icon: <FiInstagram />, label: 'Instagram' },
              { icon: <SiTiktok />, label: 'TikTok' },
              { icon: <FaSnapchatGhost />, label: 'Snapchat' },
              { icon: <FiYoutube />, label: 'YouTube' },
              { icon: <FiMessageCircle />, label: 'WhatsApp' },
            ].map(({ icon, label }) => (
              <a href="#" key={label} className="icon" data-label={label} title={label}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="nav-icons">
          <div className="circle-icon hide-on-mobile" title="Change Language"><FiGlobe /></div>
          <div className="circle-icon" title="Cart"><FaShoppingCart /></div>
          <div className="circle-icon" title="Your Profile"><FaUser /></div>
        </div>
      </nav>

      {menuOpen && <div className="close-area" onClick={() => setMenuOpen(false)} />}
    </>
  );
};

export default Navbar;