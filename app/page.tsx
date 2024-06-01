/*
You may want to change the images used on the "is_live=false" carousel
to match the image of whoever this site is deployed for

You can do so in: public/site-config.json
*/
"use client";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";

import CopeButton from "@/components/CopeButton";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [timeSinceLastActivity, setTimeSinceLastActivity] = useState(0);
  const [buttonAudioUrls, setButtonAudioUrls] = useState<string[]>([]);
  const [rareButtonAudioUrls, setRareButtonAudioUrls] = useState<string[]>([]);

  const playRandomAudioUrl = () => {
    // Rare sound effect has a 1/10 chance of playing
    if (Math.random() < 0.1) {
      const randomIndex = Math.floor(Math.random() * rareButtonAudioUrls.length);
      new Audio(rareButtonAudioUrls[randomIndex]).play();
    } else {
      const randomIndex = Math.floor(Math.random() * buttonAudioUrls.length);
      new Audio(buttonAudioUrls[randomIndex]).play();
    }
  };

  const [recentData, setRecentData] = useState<VideoData>({
    is_live: false,
    channel_name: "VTuber",
    channel_id: "UCupmjRr7kPgzXKh-cPxxGbg",
    title: "Video",
    video_id: "stub",
  } as VideoData);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/site-config.json");
        const data = await response.json();
        setImages(data.pastImages);
        setButtonAudioUrls(data.soundUrls);
        setRareButtonAudioUrls(data.rareSoundUrls);
      } catch (error) {
        console.error("Error loading past images:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/recent");
        const data = await response.json();
        setRecentData(data);
      } catch (error) {
        console.error("Error loading recent data:", error);
      }
    })();
  }, []);

  useEffect(() => {
    // Logic for updating the time since the last activity
    // If there is a currently live stream, use time since stream started
    // If there is no live stream, use time since last stream ended
    const timer = setInterval(() => {
      const now = new Date();
      const timeSinceActive = recentData.is_live
        ? now.getTime() - new Date(recentData.time_started || "").getTime()
        : now.getTime() - new Date(recentData.time_ended || "").getTime();
      setTimeSinceLastActivity(timeSinceActive);
    }, 1000);
  
    return () => {
      clearInterval(timer);
    };
  }, [recentData.is_live, recentData.time_ended, recentData.time_started]);

  const imageStyle = {
    height: "300px",
    width: "auto",
  };

  return (
    <>
  <h1 className="text-center font-bold text-4xl" style={{fontFamily: 'Arial'}}>I Miss {recentData.channel_name}</h1>
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
        <>
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
        <h1 className="text-center text-2xl">
          {recentData.channel_name} is not live right now.
          <br/>
          Most Recent Activity:
        </h1>
        <h1 className="text-center text-xl">
          <a href={`https://youtube.com/watch?v=${recentData.video_id}`}>{recentData.title}</a>
        </h1>
        <h2 className="text-center text-lg">
          {String(Math.floor(timeSinceLastActivity / 1000 / 60 / 60)).padStart(2, '0')}:
          {String(Math.floor((timeSinceLastActivity / 1000 / 60) % 60)).padStart(2, '0')}:
          {String(Math.floor((timeSinceLastActivity / 1000) % 60)).padStart(2, '0')}
          {' '}ago
        </h2>
        </>
      )}
      <CopeButton
        onClick={playRandomAudioUrl}
        buttonText={recentData.is_live ? "Yipee!" : "Cope"}
        buttonImgUrl="https://files.pinapelz.com/rguk27.gif"
        imgWidth="250px"
        imgHeight="250px"
      />
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
