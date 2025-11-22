import { useState } from 'react';
import pfp from '../Assets/images/pfp.png';

function Contact({ supabase, user }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
      
      // Reset success message after 3 seconds
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
    <main className="container">
      <div className="main">
        <div className="images">
          <img src={pfp} alt="Walid Sabbar - Web Developer" className="img-w" />
        </div>
        <div className="detail">
          <h1>Contact</h1>
          <p className="tagline">Get in touch with me. I'll get back to you as soon as possible!</p>
          
          {user && (
            <div className="user-notice">
              <p>Welcome back, {user.email}! Your messages will be linked to your account.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
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
            <div className="form-group">
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
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
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
    </main>
  );
}

export default Contact;