import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#555', // Lighter grey color
    color: '#fff', // White text color for contrast
    padding: '20px 0', // More padding for better spacing
    textAlign: 'center', // Centered text
    bottom: '0', // Align to the bottom
    width: '100%', // Full width
    borderTop: '1px solid #444', // Subtle border on top
    fontFamily: 'Arial, sans-serif', // Modern font
    fontSize: '16px', // Slightly larger font size
  };

  return (
    <div style={footerStyle}>
      Medicine cures diseases but only doctors can cure patients 
    </div>
  );
};

export default Footer;
