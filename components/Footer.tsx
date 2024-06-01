import React from 'react';

const Footer: React.FC<{ message: string }> = ({ message }) => {
    return (
        <div className="p-5 text-center">
            <a href="https://github.com/pinapelz/IMissVTuber" className="text-gray-500 text-sm">Source Code</a>
            <p>{message}</p>
        </div>
    );
};

export default Footer;