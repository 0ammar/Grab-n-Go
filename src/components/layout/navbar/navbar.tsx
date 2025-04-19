import './navbar.scss';
import { useState, useRef, useEffect } from 'react';
import { FaBars, FaTimes, FaShoppingCart, FaUser } from 'react-icons/fa';
import { FiFacebook, FiInstagram, FiYoutube, FiMessageCircle, FiGlobe } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';

import enFlag from '@/assets/images/english.png';
import arFlag from '@/assets/images/arabic.png';
import frFlag from '@/assets/images/french.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const globeRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen(prev => {
      if (!prev) setLangOpen(false); // اغلق منيو اللغة إذا فتحت منيو السوشال
      return !prev;
    });
  };

  const toggleLang = () => {
    setLangOpen(prev => {
      if (!prev) setMenuOpen(false); // اغلق منيو السوشال إذا فتحت منيو اللغة
      return !prev;
    });
  };

  useEffect(() => {
    if (globeRef.current && langMenuRef.current) {
      const globeRect = globeRef.current.getBoundingClientRect();
      const isMobile = window.innerWidth <= 768;

      langMenuRef.current.style.top = isMobile
        ? `${globeRect.bottom + 44}px`
        : `${globeRect.bottom + 6}px`;

      langMenuRef.current.style.left = isMobile
        ? `${globeRect.left + 50}px`
        : `${globeRect.left}px`;
    }
  }, [langOpen]);

  const socialLinks = [
    { icon: <FiFacebook />, label: 'Facebook' },
    { icon: <FiInstagram />, label: 'Instagram' },
    { icon: <SiTiktok />, label: 'TikTok' },
    { icon: <FiYoutube />, label: 'YouTube' },
    { icon: <FiMessageCircle />, label: 'WhatsApp' },
  ];

  const languageOptions = [
    { code: 'EN', label: 'English', img: enFlag },
    { code: 'AR', label: 'العربية', img: arFlag },
    { code: 'FR', label: 'Français', img: frFlag },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="social-section">
          <button className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div ref={globeRef} className="lang-icon mobile-only" title="Change Language" onClick={toggleLang}>
            <FiGlobe />
          </div>

          <span className="label hide-on-mobile" onClick={toggleMenu}>Social Media</span>

          <div className={`social-menu ${menuOpen ? 'open' : ''}`}>
            {socialLinks.map(({ icon, label }) => (
              <a href="#" key={label} className="icon" data-label={label} title={label}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="nav-icons">
          <div ref={globeRef} className="circle-icon hide-on-mobile" title="Change Language" onClick={toggleLang}>
            <FiGlobe />
          </div>
          <div className="circle-icon" title="Cart"><FaShoppingCart /></div>
          <div className="circle-icon" title="Your Profile"><FaUser /></div>
        </div>
      </nav>

      {langOpen && (
        <div className="lang-menu" ref={langMenuRef}>
          {languageOptions.map(({ code, img }) => (
            <div key={code} className="lang-option" title={code}>
              <img src={img} alt={code} />
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
