// Contact.js
import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPaperPlane, FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';

function Contact({ supabase, user }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.classList.add('page-loaded');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            user_id: user?.id || null,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) throw error;

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving contact:', error.message);
      setError('Failed to send message. Please try again.');
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
              <p>walid.sabbar@example.com</p>
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
          {user && (
            <div className="user-notice">
              <p>Welcome back, {user.email}! Your messages will be linked to your account.</p>
            </div>
          )}

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
                  disabled={loading}
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
                  disabled={loading}
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
                disabled={loading}
              />
            </div>
            
            <button 
              type="submit" 
              className="submit-btn with-icon"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane className="btn-icon" />
                  Send Message
                </>
              )}
            </button>
          </form>
          
          {success && (
            <div className="success-message">
              <p>✅ Message sent successfully! I'll get back to you soon.</p>
            </div>
          )}
          
          {error && (
            <div className="error-message">
              <p>❌ {error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;