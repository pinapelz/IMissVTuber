import React from 'react';

interface FooterProps {
    text?: string;
}

const Footer: React.FC<FooterProps> = ({ text = "Default Footer Text" }) => {
    const footerStyle: React.CSSProperties = {
        textAlign: 'center',
        padding: '10px',
        position: 'fixed',
        left: '0',
        bottom: '0',
        width: '100%',
    };

    return (
        <footer style={footerStyle}>
            <p>{text}</p>
        </footer>
    );
};

export default Footer;
