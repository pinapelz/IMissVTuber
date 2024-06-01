import React, { useState, useEffect } from "react";
import "../styles/CopeButton.css";
interface CopeButtonProps {
  onClick: () => void;
  buttonText: string;
  buttonImgUrl: string;
  imgWidth?: string;
  imgHeight?: string;
}

interface IGif {
  id: number;
  top: number;
  left: number;
}

const CopeButton: React.FC<CopeButtonProps> = ({
  onClick,
  buttonText,
  buttonImgUrl,
  imgWidth = "200px",
  imgHeight = "200px",
}) => {
  const [gifs, setGifs] = useState<IGif[]>([]);

  const handleClick = () => {
    onClick();
    const maxWidth = window.innerWidth - parseInt(imgWidth);
    const maxHeight = window.innerHeight - parseInt(imgHeight);
    let top = Math.random() * maxHeight;
    let left = Math.random() * maxWidth;
    setGifs((prevGifs) => [...prevGifs, { id: Date.now(), top, left }]);
  };

  // Removes the gifs after 3 seconds
  // Forcibly removes the first gif if there are more than 15 gifs
  // This is to prevent the page from lagging
  useEffect(() => {
    if (gifs.length > 15) {
      setGifs((prevGifs) => prevGifs.slice(1));
    } else if (gifs.length > 0) {
      const timer = setTimeout(() => {
        setGifs((prevGifs) => prevGifs.filter((gif) => gif.id !== gifs[0].id));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gifs]);
  
  return (
    <div
      className="text-lg text-center"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        onClick={handleClick}
        className="px-5 py-5 rounded-lg text-3xl bg-blue-500"
      >
        {buttonText}
      </button>
      {gifs.map((gif) => (
        <img
          key={gif.id}
          src={buttonImgUrl}
          alt="Animated Gif"
          style={{
            position: "absolute",
            top: gif.top,
            left: gif.left,
            zIndex: -1,
            width: imgWidth,
            height: imgHeight,
            animation: "shake 0.5s infinite, fadeout 3s forwards",
            transformOrigin: "center center",
          }}
          className="fadeout"
        />
      ))}
    </div>
  );
};

export default CopeButton;
