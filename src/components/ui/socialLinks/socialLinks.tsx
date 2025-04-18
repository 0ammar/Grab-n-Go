import './socialLinks.scss';
import { FiFacebook, FiInstagram, FiYoutube, FiMessageCircle } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';

const SocialLinks = () => {
  return (
    <div className="social-icons">
      <a href="#"><FiFacebook /></a>
      <a href="#"><FiInstagram /></a>
      <a href="#"><SiTiktok /></a>
      <a href="#"><FiYoutube /></a>
      <a href="#"><FiMessageCircle /></a>
    </div>
  );
};

export default SocialLinks;
