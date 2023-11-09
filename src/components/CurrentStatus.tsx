import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import IMissButton from "./IMissButton";
import { useTrail, animated } from 'react-spring';

interface StreamData {
  status: string;
  end_actual: string;
  channel: {
    name: string;
    english_name: string;
  };
  title: string;
  start_actual: string;
  id: string;
}

interface CurrentStatusProps {
  data: StreamData | null;
  loading: boolean;
  error: unknown;
}

const AnimatedText = ({ text }: { text: string }) => {
  const words = text.split(' ');

  const trail = useTrail(words.length, {
    config: { mass: 5, tension: 1000, friction: 1000 },
    opacity: 1,
    x: 0,
    from: { opacity: 0, x: 20 },
    delay: 100,
  });

  return (
    <>
      {trail.map(({ x, ...rest }, index) => (
        <animated.span key={words[index]} style={{ 
          ...rest, 
          transform: x.to((x) => `translate3d(0,${x}px,0)`),
        }}>
          {words[index]}{' '}
        </animated.span>
      ))}
    </>
  );
};


const CurrentStatus: React.FC<CurrentStatusProps> = ({
  data,
  loading,
  error,
}) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const pastImages = [
    "https://files.pinapelz.com/mqijtw.webp",
    "https://files.pinapelz.com/ericry.webp",
    "https://files.pinapelz.com/erina-makina-phase-connect.gif",
    "https://files.pinapelz.com/1156339143861866527.webp",
    "https://files.pinapelz.com/1077804029737975879.webp",
  ];
  const imageStyle = {
    height: "300px",
    width: "auto",
  };

  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    const now = new Date();
    if (data && data.status === "past") {
      let endActual = new Date(data.end_actual);
      if (isNaN(endActual.getTime())) { // handle if end_actual is missing
        endActual = new Date(data.start_actual);
      }
      setElapsedTime(Math.floor((now.getTime() - endActual.getTime()) / 1000));
    } else if (data && data.status === "live") {
      const startActual = new Date(data.start_actual);
      setElapsedTime(
        Math.floor((now.getTime() - startActual.getTime()) / 1000)
      );
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred while fetching data</p>;
  if (!data) return <p>No data received</p>;

  const formatElapsedTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    if (isNaN(hours) || isNaN(minutes) || isNaN(sec)){
      return "Uh oh! No clue how long it's been without Erinya"
    }
    return `${hours}h ${minutes}m ${sec}s without Erinya`;
  };
  console.log(data.status);

  return (
    <div>
      {data.status === "past" ? (
        <>
          <h1><AnimatedText text="I Miss Erinya"/></h1>
          <Carousel
            selectedItem={selectedItem}
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            showIndicators={false}
            autoPlay={true}
            interval={15000}
            infiniteLoop={true}
            onClickItem={() => {
              setSelectedItem(
                (prevSelectedItem) => (prevSelectedItem + 1) % pastImages.length
              );
            }}
          >
            {pastImages.map((url, index) => (
              <div key={index}>
                <img style={imageStyle} src={url} alt={`Past Image ${index}`} />
              </div>
            ))}
          </Carousel>
          <p className="status-text">
          Last seen streaming<br/>
          <a href={"https://youtube.com/watch?v=" + data.id}>{data.title}</a>
          </p>
          <p className="status-text">
            {formatElapsedTime(elapsedTime)} 
          </p>
          <IMissButton syncInterval={7000} 
          buttonText="Cry" 
          buttonImgUrl="https://files.pinapelz.com/rguk27.gif" 
          imgWidth="250px"
          imgHeight="250px"
          />
        </>
      ) : (
        data.status === "live" && (
          <>
            <h1><AnimatedText text="Erinya is here!"/></h1>
            <iframe
              width="600"
              height="315"
              src={`https://www.youtube.com/embed/${data.id}`}
            ></iframe>
            <p className="title-text">{data.title}</p>
            <p className="status-text">
              Streamed for: {formatElapsedTime(elapsedTime)}
            </p>
            <IMissButton 
            syncInterval={7000} 
            buttonText="Yipee!" 
            buttonImgUrl="https://files.pinpelz.com/rguk27.gif" 
            imgWidth="250px"
            imgHeight="250px"
            />
          </>
        )
      )}
    </div>
  );
};

export default CurrentStatus;
