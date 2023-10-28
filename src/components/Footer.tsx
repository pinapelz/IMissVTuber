import React from 'react';

interface FooterProps {
    text?: string;
}

const Footer: React.FC<FooterProps> = () => {
    const footerStyle: React.CSSProperties = {
        textAlign: 'center',
        padding: '10px',
        position: 'fixed',
        left: '0',
        bottom: '0',
        width: '100%',
    };
    const textStyle: React.CSSProperties = {
        fontSize: '15px',
    };

    return (
        <footer style={footerStyle}>
            <a href="https://github.com/pinapelz/imisssomeone">Source Code</a>
            <p style={textStyle}>Not affiliated with Phase Connect or Erina Makina</p>
        </footer>
    );
};

export default Footer;
