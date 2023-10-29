import React, { useEffect, useState } from "react";
import '../styles/ProgressBar.css';  // Import the CSS file

interface Props {
  onComplete: () => void;
}

const ProgressBar: React.FC<Props> = ({ onComplete }) => {
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressWidth((prevWidth) => {
        if (prevWidth >= 100) {
          onComplete();
          return 0;
        }
        return prevWidth + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      style={{
        marginTop: "50px",
        marginBottom: "50px",
        height: "10px", 
        width: "90%",  
        maxWidth: "600px", 
        backgroundColor: "#e0e0e0",
        borderRadius: "5px",
        position: "relative",
        overflow: "visible",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <div
        style={{
          height: "10px",
          width: `${progressWidth}%`,
          backgroundColor: "#006CB0",
          position: "absolute",
          bottom: 0,
          transition: 'width 0.3s ease',
          borderRadius: "5px", 
        }}
      ></div>
      <img 
        src="https://media.discordapp.net/stickers/1138720470536040500.png?size=160&passthrough=true" 
        alt="Progress Cursor" 
        className="progress-cursor"
        style={{
          position: "absolute",
          left: `${progressWidth}%`,
          transform: "translateX(-50%) translateY(-100%) scaleX(-1)",
          width: "50px",
          height: "50px",
        }} 
      />
    </div>
  );
};

export default ProgressBar;
