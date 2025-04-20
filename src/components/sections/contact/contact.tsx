import './contact.scss';
import { motion } from 'framer-motion';
import { FiFacebook, FiInstagram, FiYoutube, FiMessageCircle } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { SectionTitle, ContactForm } from '@/components/ui';

const Contact = () => {
  return (
    <motion.section
      className="contact-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <SectionTitle text="Where You Can Find Us" />

      <div className="contact-wrapper">
        {/* Map */}
        <motion.div
          className="contact-left"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <iframe
            title="Grab'n Go Location"
            src="https://www.google.com/maps/embed?pb=..."
            loading="lazy"
            allowFullScreen
          />
        </motion.div>

        {/* Form + Info */}
        <motion.div
          className="contact-right"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <ContactForm />

          <div className="social-icons">
            {[FiFacebook, FiInstagram, SiTiktok, FiYoutube, FiMessageCircle].map((Icon, idx) => (
              <a key={idx} href="#"><Icon /></a>
            ))}
          </div>

          <div className="contact-info">
            <div className="phones">
              <FaPhoneAlt /> +1 (416) 555-1234 <span>|</span> +1 (647) 555-5678
            </div>
            <div className="location">
              <FaMapMarkerAlt /> Toronto, Ontario – Canada
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
