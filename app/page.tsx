"use client";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  const [recentData, setRecentData] = useState<VideoData>({
    is_live: false,
    channel_name: "VTuber",
    channel_id: "UCupmjRr7kPgzXKh-cPxxGbg",
    title: "Video",
    video_id: "stub",
  } as VideoData);

  useEffect(() => {
    const fetchPastImages = async () => {
      try {
        const response = await fetch("/site-config.json");
        const data = await response.json();
        setImages(data.pastImages);
      } catch (error) {
        console.error("Error loading past images:", error);
      }
    };
    fetchPastImages();
  }, []);

  useEffect(() => {
    const fetchRecentData = async () => {
      try {
        const response = await fetch("/api/recent");
        const data = await response.json();
        setRecentData(data);
      } catch (error) {
        console.error("Error loading recent data:", error);
      }
    };
    fetchRecentData();
  }, []);

  const imageStyle = {
    height: "300px",
    width: "auto",
  };

  return (
    <>
      <h1 className="text-center text-lg">I Miss {recentData.channel_name}</h1>
      {recentData.is_live ? (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <h2 className="text-center text-lg">
            {recentData.channel_name} is live now!
          </h2>
          <iframe
            style={{
              width: "100%",
              maxWidth: "600px",
              display: "block",
              margin: "0 auto",
            }}
            height="315"
            src={`https://www.youtube.com/embed/${recentData.video_id}`}
          ></iframe>
          a
        </div>
      ) : (
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
              (prevSelectedItem) => (prevSelectedItem + 1) % images.length
            );
          }}
        >
          {images.map((url, index) => (
            <div key={index}>
              <img style={imageStyle} src={url} alt={`Past Image ${index}`} />
            </div>
          ))}
        </Carousel>
      )}
    </>
  );

  interface VideoData {
    is_live: boolean;
    channel_name: string;
    channel_id: string;
    title: string;
    video_id: string;
    time_started?: string;
    time_ended?: string;
  }
}
