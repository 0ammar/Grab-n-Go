import './about.scss';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/ui';
import { GiChickenOven, GiFrenchFries, GiTakeMyMoney } from 'react-icons/gi';
import { MdDeliveryDining } from 'react-icons/md';
import { FaRegSmile } from 'react-icons/fa';
import logo from '@/assets/images/logo.png';

const icons = [
  { icon: <GiChickenOven />, label: 'Crispy Chicken' },
  { icon: <GiFrenchFries />, label: 'Tasty Sides' },
  { icon: <MdDeliveryDining />, label: 'Fast Delivery' },
  { icon: <GiTakeMyMoney />, label: 'Affordable Meals' },
  { icon: <FaRegSmile />, label: 'Friendly Service' },
];

const About = () => {
  return (
    <motion.section
      className="about-section"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="about-bg-logo">
        <img src={logo} alt="Grab’n Go Logo" />
      </div>

      <div className="about-content">
        <SectionTitle text="Who is Grab’n Go" />

        <motion.p
          className="about-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Grab’n Go is more than just a name — it's an experience crafted for the modern world.
          We believe in delivering bold, exciting flavors with a heartbeat of energy and a soul rooted in quality.
          Our golden broasted chicken is legendary, our wraps are packed with passion, and every side dish tells a story of freshness and finesse.
          <br /><br />
          We blend speed with style, ensuring every meal feels like a celebration.
          Whether you're on a quick break or enjoying a chill hangout, Grab’n Go brings the vibe — fast, fresh, and full of flavor.
          <br />
          This is food redefined. This is Grab’n Go.
        </motion.p>

        <motion.div className="about-icons" initial="hidden" animate="visible">
          {icons.map((item, i) => (
            <motion.div
              className="icon-card"
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.2, duration: 0.6 }}
            >
              {item.icon}
              <span>{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
