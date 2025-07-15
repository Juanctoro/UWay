import React from "react";
import {useNavigate} from 'react-router-dom';
import './UWayLanding.css'

const UWayLanding = () => {
  const styles = {
    // Global CSS reset and full viewport
    container: {
      minHeight: "100vh",
      width: "100vw",
      margin: "0",
      padding: "0",
      background:
        "linear-gradient(to bottom right, rgba(166, 85, 247, 0.05), #ffffff, rgba(166, 85, 247, 0.1))",
      fontFamily: "system-ui, -apple-system, sans-serif",
      color: "#1a1a1a",
      position: "relative",
      overflow: "hidden",
      overflowY: "auto",
      boxSizing: "border-box",
    },
    nav: {
      padding: "24px 32px",
      width: "100%",
      boxSizing: "border-box",
    },
    navContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: "1280px",
      margin: "0 auto",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    logoIcon: {
      width: "40px",
      height: "40px",
      backgroundColor: "#a855f7",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: "20px",
    },
    logoText: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#1a1a1a",
    },
    navButtons: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    button: {
      padding: "8px 16px",
      borderRadius: "10px",
      border: "none",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.15s ease",
      boxSizing: "border-box",
    },
    buttonGhost: {
      backgroundColor: "transparent",
      color: "#1a1a1a",
    },
    buttonOutline: {
      backgroundColor: "white",
      color: "#1a1a1a",
      border: "1px solid #e5e7eb",
    },
    buttonPrimary: {
      backgroundColor: "#a855f7",
      color: "white",
    },
    buttonLarge: {
      padding: "24px 32px",
      fontSize: "18px",
      height: "44px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    section: {
      padding: "80px 32px",
      maxWidth: "1280px",
      margin: "0 auto",
      boxSizing: "border-box",
    },
    sectionCenter: {
      textAlign: "center",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      backgroundColor: "rgba(166, 85, 247, 0.1)",
      color: "#a855f7",
      fontSize: "12px",
      fontWeight: "600",
      padding: "2px 10px",
      borderRadius: "9999px",
      border: "1px solid rgba(166, 85, 247, 0.2)",
      marginBottom: "24px",
    },
    h1: {
      fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
      fontWeight: "bold",
      marginBottom: "24px",
      lineHeight: "1.1",
      margin: "0 0 24px 0",
    },
    gradient: {
      background: "linear-gradient(to right, #a855f7, rgba(166, 85, 247, 0.7))",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    lead: {
      fontSize: "20px",
      color: "#6b7280",
      marginBottom: "32px",
      maxWidth: "768px",
      margin: "0 auto 32px",
      lineHeight: "1.6",
    },
    buttonGroup: {
      display: "flex",
      gap: "16px",
      justifyContent: "center",
      marginBottom: "64px",
      flexWrap: "wrap",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "32px",
      marginTop: "64px",
    },
    card: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderRadius: "16px",
      padding: "32px",
      border: "1px solid rgba(166, 85, 247, 0.2)",
      backdropFilter: "blur(8px)",
      textAlign: "center",
      transition: "all 0.3s ease",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      boxSizing: "border-box",
    },
    cardIcon: {
      width: "48px",
      height: "48px",
      backgroundColor: "rgba(166, 85, 247, 0.2)",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 24px",
      color: "#a855f7",
    },
    h2: {
      fontSize: "clamp(1.875rem, 4vw, 2.25rem)",
      fontWeight: "bold",
      marginBottom: "24px",
      color: "#1a1a1a",
      margin: "0 0 24px 0",
    },
    h3: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "16px",
      color: "#1a1a1a",
      margin: "0 0 16px 0",
    },
    text: {
      color: "#6b7280",
      lineHeight: "1.6",
      margin: "0",
    },
    sectionAlt: {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      backdropFilter: "blur(8px)",
    },
    featureList: {
      textAlign: "left",
      margin: "32px 0",
    },
    featureItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "16px",
    },
    checkIcon: {
      width: "20px",
      height: "20px",
      color: "#a855f7",
    },
    contactGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "32px",
      marginBottom: "48px",
    },
    ctaSection: {
      background:
        "linear-gradient(to right, rgba(166, 85, 247, 0.1), rgba(166, 85, 247, 0.05))",
      borderRadius: "24px",
      padding: "clamp(32px, 5vw, 48px)",
      textAlign: "center",
    },
    footer: {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      backdropFilter: "blur(8px)",
      padding: "48px 32px",
    },
    footerContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      maxWidth: "1280px",
      margin: "0 auto",
      flexWrap: "wrap",
      gap: "16px",
    },
    footerLinks: {
      display: "flex",
      gap: "24px",
      fontSize: "14px",
      color: "#6b7280",
      flexWrap: "wrap",
    },
  };

  // Simple icon components
  const ShieldIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );

  const MapPinIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );

  const UsersIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );

  const MailIcon = () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );

  const CheckIcon = () => (
    <svg
      style={styles.checkIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m9 12 2 2 4-4" />
    </svg>
  );

  const navigate = useNavigate();

  return (
    <>
      <div style={styles.container}>
        {/* Navigation */}
        <nav style={styles.nav} className="uway-nav">
          <div style={styles.navContainer}>
            <div style={styles.logo}>
              <div style={styles.logoIcon}>U</div>
              <span style={styles.logoText}>UWay</span>
            </div>
            <div style={styles.navButtons} className="uway-nav-buttons">
              <button style={{ ...styles.button, ...styles.buttonGhost }}>
                About
              </button>
              <button style={{ ...styles.button, ...styles.buttonGhost }}>
                Contact
              </button>
              <button 
                onClick={() => navigate('/login')}
                style={{ ...styles.button, ...styles.buttonOutline }}>
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                style={{ ...styles.button, ...styles.buttonPrimary }}
                className="uway-button"
              >
                Register
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          style={{ ...styles.section, ...styles.sectionCenter }}
          className="uway-section"
        >
          <div style={styles.badge}>✨ Welcome to the Future</div>
          <h1 style={styles.h1} className="uway-hero-title">
            Safe Campus
            <br />
            <span style={styles.gradient}>Transportation</span>
          </h1>
          <p style={styles.lead} className="uway-lead">
            UWay connects educational institutions with secure, verified
            ride-sharing solutions. Students, faculty, and staff can safely
            travel together with institutional oversight and real-time tracking.
          </p>
          <div style={styles.buttonGroup} className="uway-button-group">
            <button
              style={{
                ...styles.button,
                ...styles.buttonPrimary,
                ...styles.buttonLarge,
              }}
              className="uway-button"
            >
              Get Started <ArrowRightIcon />
            </button>
            <button
              style={{
                ...styles.button,
                ...styles.buttonOutline,
                ...styles.buttonLarge,
              }}
              className="uway-button"
            >
              Learn More
            </button>
          </div>

          <div style={styles.grid} className="uway-grid">
            <div style={styles.card} className="uway-card">
              <div style={styles.cardIcon}>
                <ShieldIcon />
              </div>
              <h3 style={styles.h3}>Verified Safety</h3>
              <p style={styles.text}>Institutional validation</p>
            </div>
            <div style={styles.card} className="uway-card">
              <div style={styles.cardIcon}>
                <MapPinIcon />
              </div>
              <h3 style={styles.h3}>Real-time Tracking</h3>
              <p style={styles.text}>Live location updates</p>
            </div>
            <div style={styles.card} className="uway-card">
              <div style={styles.cardIcon}>
                <UsersIcon />
              </div>
              <h3 style={styles.h3}>Campus Community</h3>
              <p style={styles.text}>Students, faculty & staff</p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section style={{ ...styles.section, ...styles.sectionAlt }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: "48px",
              alignItems: "center",
            }}
          >
            <div>
              <div style={styles.badge}>Our Mission</div>
              <h2 style={styles.h2}>Transforming Campus Transportation</h2>
              <p style={{ ...styles.text, marginBottom: "32px" }}>
                At UWay, our mission is to provide safe, verified, and efficient
                transportation solutions for educational institutions. We
                believe that mobility within campus communities should be
                secure, accessible, and seamlessly integrated with institutional
                oversight and safety protocols.
              </p>
              <div style={styles.featureList}>
                <div style={styles.featureItem}>
                  <CheckIcon />
                  <span>
                    Safety First - Institutional validation and driver
                    verification
                  </span>
                </div>
                <div style={styles.featureItem}>
                  <CheckIcon />
                  <span>
                    Campus-Centered - Designed specifically for educational
                    communities
                  </span>
                </div>
                <div style={styles.featureItem}>
                  <CheckIcon />
                  <span>
                    Real-time Control - Live tracking and institutional
                    oversight
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                ...styles.card,
                minHeight: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="uway-card"
            >
              <div>
                <div
                  style={{
                    ...styles.cardIcon,
                    width: "80px",
                    height: "80px",
                    margin: "0 auto 16px",
                  }}
                >
                  <UsersIcon />
                </div>
                <h3 style={styles.h3}>10K+ Users</h3>
                <p style={styles.text}>Already on their journey</p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section style={styles.section} className="uway-section">
          <div style={styles.sectionCenter}>
            <div style={styles.badge}>Our Vision</div>
            <h2 style={styles.h2}>The Future of Campus Mobility</h2>
            <p style={{ ...styles.lead, marginBottom: "64px" }}>
              We envision educational institutions where transportation is
              seamlessly integrated, safe, and efficient. A future where every
              campus community has access to verified, institutional-grade
              ride-sharing that prioritizes safety and builds stronger
              connections.
            </p>
          </div>
          <div style={styles.grid} className="uway-grid">
            <div style={styles.card} className="uway-card">
              <div style={styles.cardIcon}>
                <ShieldIcon />
              </div>
              <h3 style={styles.h3}>Institutional Security</h3>
              <p style={styles.text}>
                Every institution maintains full control over driver
                verification, user approval, and safety protocols within their
                community.
              </p>
            </div>
            <div style={styles.card} className="uway-card">
              <div style={styles.cardIcon}>
                <MapPinIcon />
              </div>
              <h3 style={styles.h3}>Smart Connectivity</h3>
              <p style={styles.text}>
                Advanced route optimization, real-time tracking, and QR
                validation create a seamless transportation experience for all
                users.
              </p>
            </div>
            <div style={styles.card} className="uway-card">
              <div style={styles.cardIcon}>
                <UsersIcon />
              </div>
              <h3 style={styles.h3}>Community Building</h3>
              <p style={styles.text}>
                Connecting students, faculty, and staff through shared rides,
                building stronger campus communities while reducing
                environmental impact.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section style={{ ...styles.section, ...styles.sectionAlt }}>
          <div style={styles.sectionCenter}>
            <div style={styles.badge}>Get in Touch</div>
            <h2 style={styles.h2}>Ready to Start Your Journey?</h2>
            <p style={{ ...styles.lead, marginBottom: "64px" }}>
              Have questions or want to learn more? We'd love to hear from you.
              Reach out and let's discuss how UWay can help you achieve your
              goals.
            </p>
          </div>

          <div style={styles.contactGrid}>
            <div style={styles.card} className="uway-card">
              <div style={styles.cardIcon}>
                <PhoneIcon />
              </div>
              <h3 style={styles.h3}>Phone</h3>
              <p style={{ ...styles.text, marginBottom: "16px" }}>
                Call us anytime
              </p>
              <p style={{ color: "#1a1a1a", fontWeight: "500" }}>
                +1 (555) 123-4567
              </p>
            </div>
            <div style={styles.card} className="uway-card">
              <div style={styles.cardIcon}>
                <MailIcon />
              </div>
              <h3 style={styles.h3}>Email</h3>
              <p style={{ ...styles.text, marginBottom: "16px" }}>
                Send us a message
              </p>
              <p style={{ color: "#1a1a1a", fontWeight: "500" }}>
                hello@uway.app
              </p>
            </div>
            <div style={styles.card} className="uway-card">
              <div style={styles.cardIcon}>
                <MapPinIcon />
              </div>
              <h3 style={styles.h3}>Office</h3>
              <p style={{ ...styles.text, marginBottom: "16px" }}>Visit us</p>
              <p style={{ color: "#1a1a1a", fontWeight: "500" }}>
                San Francisco, CA
              </p>
            </div>
          </div>

          <div style={styles.ctaSection}>
            <h3
              style={{ ...styles.h2, fontSize: "2rem", marginBottom: "16px" }}
            >
              Ready to Transform Your Future?
            </h3>
            <p
              style={{
                ...styles.text,
                marginBottom: "32px",
                maxWidth: "600px",
                margin: "0 auto 32px",
              }}
            >
              Join thousands of others who are already using UWay to unlock new
              opportunities and accelerate their success.
            </p>
            <div style={styles.buttonGroup} className="uway-button-group">
              <button
                style={{
                  ...styles.button,
                  ...styles.buttonPrimary,
                  ...styles.buttonLarge,
                }}
                className="uway-button"
              >
                Register Now <ArrowRightIcon />
              </button>
              <button
                style={{
                  ...styles.button,
                  ...styles.buttonOutline,
                  ...styles.buttonLarge,
                }}
                className="uway-button"
              >
                Login to Account
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerContainer} className="uway-footer-container">
            <div style={styles.logo}>
              <div
                style={{
                  ...styles.logoIcon,
                  width: "32px",
                  height: "32px",
                  fontSize: "16px",
                }}
              >
                U
              </div>
              <span style={{ ...styles.logoText, fontSize: "20px" }}>UWay</span>
            </div>
            <div style={styles.footerLinks}>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>© 2024 UWay. All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default UWayLanding;
