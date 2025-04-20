import './socialLinks.scss';
import { FiFacebook, FiInstagram, FiYoutube, FiMessageCircle } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';

type SocialLinksProps = {
  direction?: 'row' | 'column';
  size?: 'sm' | 'md' | 'lg';
  withLabels?: boolean;
  className?: string;
};

const socialItems = [
  { icon: <FiFacebook />, label: 'Facebook' },
  { icon: <FiInstagram />, label: 'Instagram' },
  { icon: <SiTiktok />, label: 'TikTok' },
  { icon: <FiYoutube />, label: 'YouTube' },
  { icon: <FiMessageCircle />, label: 'WhatsApp' },
];

const SocialLinks = ({
  direction = 'row',
  size = 'md',
  withLabels = false,
  className = '',
}: SocialLinksProps) => {
  return (
    <div className={`social-icons ${direction} ${size} ${className}`}>
      {socialItems.map(({ icon, label }) => (
        <a key={label} href="#" className="icon" title={label}>
          {icon}
          {withLabels && <span className="label">{label}</span>}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
