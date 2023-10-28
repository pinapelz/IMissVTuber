import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface StreamData {
  status: string;
  end_actual: string;
  channel: {
    name: string;
  };
  title: string;
  start_actual: string;
  id: string;
}

const CurrentStatus: React.FC = () => {
  const pastImages = [
    "https://files.catbox.moe/mqijtw.webp",
  ];

  const imageStyle = {
    height: "300px",
    width: "auto",
  };

  const [data, setData] = useState<StreamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    fetch("https://imisserinya.vercel.app/api/live")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result: StreamData) => {
        setData(result);
        setLoading(false);
        const now = new Date();
        if (result.status === "past") {
          const endActual = new Date(result.end_actual);
          setElapsedTime(
            Math.floor((now.getTime() - endActual.getTime()) / 1000)
          );
        }
        else if(result.status === "live"){
            const startActual = new Date(result.start_actual);
            setElapsedTime(
                Math.floor((now.getTime() - startActual.getTime()) / 1000)
              );
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occured while fetching data</p>;
  if (!data) return <p>No data received</p>;

  const formatElapsedTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${hours}h ${minutes}m ${sec}s`;
  };

  return (
    <div>
      {data.status === "past" ? (
        <>
        <Carousel
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            autoPlay={true}
            infiniteLoop={true}
          >
            {pastImages.map((url, index) => (
              <div key={index}>
                <img style={imageStyle} src={url} alt={`Past Image ${index}`} />
              </div>
            ))}
          </Carousel>
          <p>
            Erinya is not streaming. uuuuuuuu!!!
            <br />
            {formatElapsedTime(elapsedTime)} without Erinya :(
          </p>
        </>
      ) : (
        data.status === "live" && 
        <>
            <p>Erinya is live yipeee!</p>
            <iframe width="600" height="315"
            src={`https://www.youtube.com/embed/${data.id}`}>
            </iframe> 
            <p>{data.title}</p>
            <p>Streamed for: {formatElapsedTime(elapsedTime)}</p>
        </>
      )}
    </div>
  );
};

export default CurrentStatus;
