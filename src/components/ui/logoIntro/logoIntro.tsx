import './logoIntro.scss';
import logo from '@/assets/images/logo.png'; 
import { useEffect, useState } from 'react';

const LogoIntro = () => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDone(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  if (done) return null;

  return (
    <div className="logo-animation-wrapper">
      <img src={logo} className="logo" alt="Logo" />
    </div>
  );
};

export default LogoIntro;
