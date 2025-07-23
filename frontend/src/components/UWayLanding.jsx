import { useNavigate } from "react-router-dom";
import "./styles/UWayLanding.css";
import { useAuth } from "../context/AuthContext"; 

const UWayLanding = () => {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth(); 


  /* Icon components */
  const ShieldIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
  const MapPinIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
  const UsersIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
  const ArrowRightIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
  const PhoneIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
  const MailIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
  const CheckIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 12 2 2 4-4" />
    </svg>
  );

  return (
    <div className="uway-container">
      {/* Navigation */}
      <nav className="uway-nav">
        <div className="uway-nav-container">
          <div className="uway-logo">
            <div className="uway-logo-icon">U</div>
            <span className="uway-logo-text">UWay</span>
          </div>
          <div className="uway-nav-buttons">
            <button className="uway-button uway-button--ghost">About</button>
            <button className="uway-button uway-button--ghost">Contact</button>
            {user ? (
              <>
                <button
                  className="uway-button uway-button--outline"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </button>
                <button
                  className="uway-button uway-button--outline"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>
                <button
                  className="uway-button uway-button--ghost"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="uway-button uway-button--outline"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="uway-button uway-button--primary"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="uway-section uway-section--center">
        <div className="uway-badge">✨ Welcome to the Future</div>
        <h1 className="uway-hero-title">
          Safe Campus
          <br />
          <span className="uway-gradient">Transportation</span>
        </h1>
        <p className="uway-lead">
          UWay connects educational institutions with secure, verified ride-sharing solutions. Students, faculty, and staff can safely travel together with institutional oversight and real-time tracking.
        </p>
        <div className="uway-button-group">
          <button className="uway-button uway-button--primary uway-button--large">
            Get Started <ArrowRightIcon />
          </button>
          <button className="uway-button uway-button--outline uway-button--large">
            Learn More
          </button>
        </div>
        <div className="uway-grid">
          <div className="uway-card">
            <div className="uway-card-icon"><ShieldIcon /></div>
            <h3 className="uway-h3">Verified Safety</h3>
            <p className="uway-text">Institutional validation</p>
          </div>
          <div className="uway-card">
            <div className="uway-card-icon"><MapPinIcon /></div>
            <h3 className="uway-h3">Real-time Tracking</h3>
            <p className="uway-text">Live location updates</p>
          </div>
          <div className="uway-card">
            <div className="uway-card-icon"><UsersIcon /></div>
            <h3 className="uway-h3">Campus Community</h3>
            <p className="uway-text">Students, faculty & staff</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="uway-section uway-section--alt">
        <div className="uway-grid">
          <div>
            <div className="uway-badge">Our Mission</div>
            <h2 className="uway-h2">Transforming Campus Transportation</h2>
            <p className="uway-text" style={{ marginBottom: "32px" }}>
              At UWay, our mission is to provide safe, verified, and efficient transportation solutions for educational institutions. We believe that mobility within campus communities should be secure, accessible, and seamlessly integrated with institutional oversight and safety protocols.
            </p>
              <div className="uway-feature-list">
                <div className="uway-feature-item">
                  <CheckIcon className="uway-check-icon"/>
                  <span>Safety First – Institutional validation and driver verification</span>
                </div>
                <div className="uway-feature-item">
                  <CheckIcon className="uway-check-icon"/>
                  <span>Campus-Centered – Designed specifically for educational communities</span>
                </div>
                <div className="uway-feature-item">
                  <CheckIcon className="uway-check-icon"/>
                  <span>Real-time Control – Live tracking and institutional oversight</span>
                </div>
              </div>
          </div>
          <div className="uway-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "300px" }}>
            <div>
              <div className="uway-card-icon" style={{ width: "80px", height: "80px", margin: "0 auto 16px" }}><UsersIcon /></div>
              <h3 className="uway-h3">10K+ Users</h3>
              <p className="uway-text">Already on their journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="uway-section uway-section--center">
        <div className="uway-badge">Our Vision</div>
        <h2 className="uway-h2">The Future of Campus Mobility</h2>
        <p className="uway-lead" style={{ marginBottom: "64px" }}>
          We envision educational institutions where transportation is seamlessly integrated, safe, and efficient. A future where every campus community has access to verified, institutional-grade ride-sharing that prioritizes safety and builds stronger connections.
        </p>
        <div className="uway-grid">
          <div className="uway-card">
            <div className="uway-card-icon"><ShieldIcon /></div>
            <h3 className="uway-h3">Institutional Security</h3>
            <p className="uway-text">
              Every institution maintains full control over driver verification, user approval, and safety protocols within their community.
            </p>
          </div>
          <div className="uway-card">
            <div className="uway-card-icon"><MapPinIcon /></div>
            <h3 className="uway-h3">Smart Connectivity</h3>
            <p className="uway-text">
              Advanced route optimization, real-time tracking, and QR validation create a seamless transportation experience for all users.
            </p>
          </div>
          <div className="uway-card">
            <div className="uway-card-icon"><UsersIcon /></div>
            <h3 className="uway-h3">Community Building</h3>
            <p className="uway-text">
              Connecting students, faculty, and staff through shared rides, building stronger campus communities while reducing environmental impact.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="uway-section uway-section--alt">
        <div className="uway-section--center">
          <div className="uway-badge">Get in Touch</div>
          <h2 className="uway-h2">Ready to Start Your Journey?</h2>
          <p className="uway-lead" style={{ marginBottom: "64px" }}>
            Have questions or want to learn more? We'd love to hear from you. Reach out and let's discuss how UWay can help you achieve your goals.
          </p>
        </div>
        <div className="uway-contact-grid">
          <div className="uway-card">
            <div className="uway-card-icon"><PhoneIcon /></div>
            <h3 className="uway-h3">Phone</h3>
            <p className="uway-text" style={{ marginBottom: "16px" }}>Call us anytime</p>
            <p style={{ color: "#1a1a1a", fontWeight: 500 }}>+1 (555) 123-4567</p>
          </div>
          <div className="uway-card">
            <div className="uway-card-icon"><MailIcon /></div>
            <h3 className="uway-h3">Email</h3>
            <p className="uway-text" style={{ marginBottom: "16px" }}>Send us a message</p>
            <p style={{ color: "#1a1a1a", fontWeight: 500 }}>hello@uway.app</p>
          </div>
          <div className="uway-card">
            <div className="uway-card-icon"><MapPinIcon /></div>
            <h3 className="uway-h3">Office</h3>
            <p className="uway-text" style={{ marginBottom: "16px" }}>Visit us</p>
            <p style={{ color: "#1a1a1a", fontWeight: 500 }}>San Francisco, CA</p>
          </div>
        </div>
        <div className="uway-cta-section">
          <h3 className="uway-h2" style={{ fontSize: "2rem", marginBottom: "16px" }}>Ready to Transform Your Future?</h3>
          <p className="uway-text" style={{ marginBottom: "32px", maxWidth: "600px", margin: "0 auto 32px" }}>
            Join thousands of others who are already using UWay to unlock new opportunities and accelerate their success.
          </p>
          <div className="uway-button-group">
            <button className="uway-button uway-button--primary uway-button--large"
            onClick={() => navigate("/register")}
            >
              Register Now <ArrowRightIcon />
            </button>
            <button className="uway-button uway-button--outline uway-button--large">
              Login to Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="uway-footer">
        <div className="uway-footer-container">
          <div className="uway-logo">
            <div className="uway-logo-icon" style={{ width: "32px", height: "32px", fontSize: "16px" }}>U</div>
            <span className="uway-logo-text" style={{ fontSize: "20px" }}>UWay</span>
          </div>
          <div className="uway-footer-links">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>© 2024 UWay. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UWayLanding;
