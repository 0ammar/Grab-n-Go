import './contactForm.scss';
import { useState, useEffect } from 'react';

const ContactForm = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSnackbar(true);
  };

  useEffect(() => {
    if (showSnackbar) {
      const timer = setTimeout(() => setShowSnackbar(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSnackbar]);

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" placeholder="Your Name" required />
        <label htmlFor="message">Message</label>
        <textarea id="message" placeholder="Your Message" rows={4} required />
        <button type="submit">Send Message</button>
      </form>

      {showSnackbar && (
        <div className="snackbar">✅ Message sent successfully!</div>
      )}
    </>
  );
};

export default ContactForm;
