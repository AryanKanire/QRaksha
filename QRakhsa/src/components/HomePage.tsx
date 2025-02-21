import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import { AlertCircle } from 'lucide-react'; // Import AlertCircle icon

const Homepage = () => {
  return (
    <div style={styles.container}>

      {/* EmergencyQRBrand moved to top left */}
      <div style={styles.emergencyQRBrandTopLeftContainer}>
        <Link to="/" style={styles.brandLink}>
          <AlertCircle style={styles.brandIcon} />
          <span style={styles.brandText}>EmergencyQR</span>
        </Link>
      </div>

      {/* Login Button moved to top right */}
      <div style={styles.loginButtonTopRightContainer}>
        <Link to="/login" style={styles.loginButton}>
          Continue with Login
        </Link>
      </div>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <header style={styles.header}>
          <h1 style={styles.title}>QRaksha</h1>
          <p style={styles.subtitle}>Revolutionizing Emergency Response & Workplace Safety</p>
        </header>
      </section>

      {/* What We Offer Section - Abbreviated */}
      <section style={styles.offerSection}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>What We Offer</h2>
          <p style={styles.description}>
            QRaksha is a smart Emergency QR Code System designed to boost workplace safety and speed up emergency response. It integrates easily with existing security, using QR codes, live tracking, and instant alerts for quick access to vital info when it matters most.
          </p>
        </div>
      </section>

      {/* Key Features Section - Horizontal Cards */}
      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Key Features & Real-Time Impact</h2>
        <div style={styles.featureCardsContainerHorizontal}>
          <div style={styles.featureCardHorizontal}>
            <h3 style={styles.featureCardTitle}>Employee QR Codes</h3>
            <p style={styles.featureCardDescription}>
              Unique, scannable codes with emergency contacts & medical info. Facilitates instant access to crucial data during crises.
            </p>
          </div>

          <div style={styles.featureCardHorizontal}>
            <h3 style={styles.featureCardTitle}>SOS Alert System</h3>
            <p style={styles.featureCardDescription}>
              One-click emergency button sends live location via SMS, email, and push notifications. Ensures rapid response and real-time tracking of distress signals.
            </p>
          </div>

          <div style={styles.featureCardHorizontal}>
            <h3 style={styles.featureCardTitle}>Admin Dashboard for Incident Tracking</h3>
            <p style={styles.featureCardDescription}>
              Role-based access to monitor emergency alerts & locations. Centralized system improves incident handling efficiency by 25%.
            </p>
          </div>

          <div style={styles.featureCardHorizontal}>
            <h3 style={styles.featureCardTitle}>Live Location Tracking with Geo-Fencing</h3>
            <p style={styles.featureCardDescription}>
              Monitors employees in real time with GPS-based location accuracy. Enhances security with proactive boundary alerts.
            </p>
          </div>

          <div style={styles.featureCardHorizontal}>
            <h3 style={styles.featureCardTitle}>AI-Driven Emergency Prediction (Future Scope)</h3>
            <p style={styles.featureCardDescription}>
              Uses anomaly detection for predicting potential security threats. Iterative ML integration enhances proactive safety measures.
            </p>
          </div>
        </div>
      </section>

      <footer style={styles.footer}>
        {/* <p style={styles.footerText}>
          Empowering Safer Workplaces with Intelligent Technology.
        </p> */}
      </footer>

    </div>
  );
};

// Enhanced and Sectioned Inline Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '60px 30px',
    backgroundColor: '#111827',
    fontFamily: "'Roboto', 'Helvetica Neue', Arial, sans-serif",
    color: '#f8f8f8',
    textAlign: 'center',
    position: 'relative',
    // overflow: 'hidden',
  },
  // EmergencyQRBrand Top Left Container (NEW - for top left logo)
  emergencyQRBrandTopLeftContainer: {
    position: 'absolute',
    top: '20px',
    left: '30px', // Positioned to the left
    zIndex: 10,
  },
  brandLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none', // Remove underline from Link
    color: 'inherit',        // Inherit text color from parent
  },
  brandIcon: {
    height: '2.5rem', // Adjusted icon size (in rem for relative sizing)
    width: '2.5rem',  // Adjusted icon size
    color: 'red', // Icon color (you can adjust this or use Tailwind classes)
  },
  brandText: {
    marginLeft: '0.5rem', // Spacing between icon and text (in rem)
    fontSize: '1.5rem',  // Adjusted font size (in rem)
    fontWeight: 'bold',
    color: '#f8f8f8', // Text color (white/off-white)
  },
  // Login Button Top Right Container
  loginButtonTopRightContainer: {
    position: 'absolute',
    top: '20px',
    right: '30px',
    zIndex: 10,
  },
  // Hero Section Styles
  heroSection: {
    marginBottom: '60px',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '3.5em',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '10px',
    letterSpacing: '1px',
    textShadow: '2px 2px 3px rgba(0,0,0,0.3)',
  },
  subtitle: {
    fontSize: '1.2em',
    color: '#ddd',
    marginBottom: '20px',
    fontStyle: 'italic',
  },

  // What We Offer Section Styles
  offerSection: {
    marginBottom: '60px',
    width: '100%',
    maxWidth: '800px',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#1e293b',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
    border: '1px solid #374151',
    textAlign: 'left',
    width: 'auto',
    maxWidth: '100%',
    marginRight: '0',
  },
  cardTitle: {
    fontSize: '1.8em',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#3498db',
    textAlign: 'center',
  },
  description: {
    fontSize: '1.15em',
    lineHeight: '1.7',
    color: '#ddd',
  },

  // Key Features Section Styles - Horizontal Cards - ADJUSTED for Responsiveness and Bigger Cards
  featuresSection: {
    marginBottom: '70px',
    width: '100%',
    // maxWidth: '1200px',  Removed maxWidth - for responsiveness
  },
  sectionTitle: {
    fontSize: '2.2em',
    fontWeight: 'bold',
    marginBottom: '40px',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: '0.5px',
  },
  featureCardsContainerHorizontal: {
    display: 'flex',
    flexDirection: 'row', // Default to row layout for wider screens
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    gap: '20px', // Slightly increased gap for bigger cards
    overflowX: 'hidden',
    paddingBottom: '0px',

    // Media Query for smaller screens (e.g., tablets and phones)
    '@media (max-width: 768px)': { // Adjust breakpoint as needed
      flexDirection: 'column', // Switch to column layout on smaller screens
      alignItems: 'center',     // Center items when stacked vertically
      gap: '40px',             // Increased vertical gap for bigger stacked cards
    },
  },
  featureCardHorizontal: {
    backgroundColor: '#1e293b',
    padding: '30px', // Increased padding for bigger cards
    borderRadius: '12px', // Slightly increased border-radius to match bigger size
    boxShadow: '0 8px 20px rgba(0,0,0,0.4)', // Adjusted shadow for bigger cards
    border: '1px solid #374151',
    textAlign: 'left',
    flex: '1', // Still use flex: '1' for horizontal distribution
    minWidth: '320px', // Increased minWidth to accommodate bigger content

    // Media Query for smaller screens (adjustments for stacked cards)
    '@media (max-width: 768px)': {
      minWidth: 'auto', // Allow full width when stacked
      width: '100%',     // Take full width of container when stacked
      maxWidth: '500px', // Optional: Increased max width for stacked cards if needed
      textAlign: 'center', // Center text in stacked cards
      padding: '40px', // Slightly increased padding for stacked cards on small screens
    },
  },
  featureCardTitle: {
    fontSize: '1.5em', // Increased title font size
    fontWeight: 'bold', // Made title bolder for emphasis
    marginBottom: '15px', // Increased margin for better spacing
    color: '#3498db',
  },
  featureCardDescription: {
    fontSize: '1.1em', // Increased description font size
    lineHeight: '1.7', // Adjusted line height for bigger text
    color: '#ddd',
  },

  // Get Started Section Styles - REMOVED

  footer: { // Footer styles remain, but Get Started Section removed
    marginBottom: '20px',
    marginTop: '60px',
    paddingBottom: '20px',
  },
  loginButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '12px 24px',
    fontSize: '1em',
    fontWeight: '500',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'inline-block',
    '&:hover': {
      backgroundColor: '#2980b9',
      transform: 'scale(1.03)',
      boxShadow: '0 6px 14px rgba(0,0,0,0.2)',
    },
    '&:active': {
      transform: 'scale(0.99)',
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    },
  },
  footerText: {
    marginTop: '20px',
    fontSize: '0.95em',
    color: '#ccc',
  },
};

export default Homepage;