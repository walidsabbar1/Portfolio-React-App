// Contact.js
import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPaperPlane, FaMapMarkerAlt, FaClock, FaCheck, FaTimes } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [buttonVibrate, setButtonVibrate] = useState(false);

  useEffect(() => {
    document.body.classList.add('page-loaded');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);
    setButtonVibrate(false);

    // Formspree endpoint - replace with your actual form ID
    const formspreeEndpoint = 'https://formspree.io/f/mwpjoeqr';

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Contact - ${formData.name}`,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success state after 5 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setError(true);
      setButtonVibrate(true);
      
      // Stop vibration after 1 second
      setTimeout(() => {
        setButtonVibrate(false);
      }, 1000);
      
      // Reset error state after 5 seconds
      setTimeout(() => {
        setError(false);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Get button content based on state
  const getButtonContent = () => {
    if (loading) {
      return (
        <>
          <div className="loading-spinner"></div>
          Sending...
        </>
      );
    }
    
    if (success) {
      return (
        <>
          <FaCheck className="btn-icon" />
          Sent Successfully!
        </>
      );
    }
    
    if (error) {
      return (
        <>
          <FaTimes className="btn-icon" />
          Failed - Try Again
        </>
      );
    }
    
    return (
      <>
        <FaPaperPlane className="btn-icon" />
        Send Message
      </>
    );
  };

  // Get button class based on state
  const getButtonClass = () => {
    let className = "submit-btn with-icon";
    
    if (success) className += " btn-success";
    if (error) className += " btn-error";
    if (buttonVibrate) className += " vibrate";
    
    return className;
  };

  return (
    <div className="detail">
      <h1 className="animate-slide-up">Contact</h1>
      <p className="tagline animate-slide-up">Get in touch with me. I'll get back to you as soon as possible!</p>
      
      <div className="contact-container">
        <div className="contact-info animate-card" style={{animationDelay: '0.2s'}}>
          <h3>Let's Connect</h3>
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <div>
              <strong>Location</strong>
              <p>Morocco</p>
            </div>
          </div>
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <div>
              <strong>Email</strong>
              <a href="mailto:wsabbar20@gmail.com" style={{color: 'inherit', textDecoration: 'none'}}>
                <p>wsabbar20@gmail.com</p>
              </a>
            </div>
          </div>
          <div className="contact-item">
            <FaClock className="contact-icon" />
            <div>
              <strong>Response Time</strong>
              <p>Within 24 hours</p>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper animate-card" style={{animationDelay: '0.3s'}}>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading || success}
                />
              </div>
            </div>
            
            <div className="form-group">
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading || success}
                />
              </div>
            </div>
            
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading || success}
              />
            </div>
            
            <button 
              type="submit" 
              className={getButtonClass()}
              disabled={loading || success}
            >
              {getButtonContent()}
            </button>
          </form>
          
          {/* Removed the success and error message blocks */}
        </div>
      </div>
    </div>
  );
}

export default Contact;