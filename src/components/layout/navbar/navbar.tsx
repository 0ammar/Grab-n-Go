import './navbar.scss';
import { useState } from 'react';
import { FaBars, FaTimes, FaShoppingCart, FaUser } from 'react-icons/fa';
import { FiFacebook, FiInstagram, FiYoutube, FiMessageCircle, FiGlobe } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const toggleLang = () => setLangOpen(prev => !prev);



  const socialLinks = [
    { icon: <FiFacebook />, label: 'Facebook' },
    { icon: <FiInstagram />, label: 'Instagram' },
    { icon: <SiTiktok />, label: 'TikTok' },
    { icon: <FiYoutube />, label: 'YouTube' },
    { icon: <FiMessageCircle />, label: 'WhatsApp' },
  ];

  const languageOptions = ['EN', 'AR', 'FR'];

  return (
    <>
      <nav className="navbar">
        <div className="social-section">
          <button className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className="lang-icon mobile-only" title="Change Language" onClick={toggleLang}>
            <FiGlobe />
          </div>

          <span className="label hide-on-mobile" onClick={toggleMenu}>
            Social Media
          </span>

          <div className={`social-menu ${menuOpen ? 'open' : ''}`}>
            {socialLinks.map(({ icon, label }) => (
              <a href="#" key={label} className="icon" data-label={label} title={label}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="nav-icons">
          <div className="circle-icon hide-on-mobile" title="Change Language" onClick={toggleLang}>
            <FiGlobe />
          </div>
          <div className="circle-icon" title="Cart"><FaShoppingCart /></div>
          <div className="circle-icon" title="Your Profile"><FaUser /></div>
        </div>
      </nav>

      {langOpen && (
        <div className="lang-menu">
          {languageOptions.map(lang => (
            <div key={lang} className="lang-option">
              {lang === 'EN' && 'English'}
              {lang === 'AR' && 'العربية'}
              {lang === 'FR' && 'Français'}
            </div>
          ))}
        </div>
      )}

      {(menuOpen || langOpen) && (
        <div className="close-area" onClick={() => {
          setMenuOpen(false);
          setLangOpen(false);
        }} />
      )}
    </>
  );
};

export default Navbar;
