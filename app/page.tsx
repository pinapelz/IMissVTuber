/*
You may want to change the images used on the "is_live=false" carousel
to match the image of whoever this site is deployed for

You can do so in: public/site-config.json
*/
"use client";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import CopeButton from "@/components/CopeButton";
import Footer from "@/components/Footer";
import ChannelCard from "@/components/ChannelCard";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [timeSinceLastActivity, setTimeSinceLastActivity] = useState(0);
  const [buttonAudioUrls, setButtonAudioUrls] = useState<string[]>([]);
  const [rareButtonAudioUrls, setRareButtonAudioUrls] = useState<string[]>([]);
  const [copeButtonClickCount, setCopeButtonClickCount] = useState(0);

  const playRandomAudioUrl = () => {
    // Rare sound effect has a 1/10 chance of playing
    if (Math.random() < 0.1) {
      const randomIndex = Math.floor(
        Math.random() * rareButtonAudioUrls.length
      );
      new Audio(rareButtonAudioUrls[randomIndex]).play();
    } else {
      const randomIndex = Math.floor(Math.random() * buttonAudioUrls.length);
      new Audio(buttonAudioUrls[randomIndex]).play();
    }
  };

  const handleCopeButtonClick = () => {
    setCopeButtonClickCount((prevCount) => prevCount + 1);
    playRandomAudioUrl();
  };

  const [recentData, setRecentData] = useState<VideoData>({
    is_live: false,
    channel_name: "VTuber",
    channel_id: "UCupmjRr7kPgzXKh-cPxxGbg",
    title: "Video",
    video_id: "stub",
  } as VideoData);

  const [channelInfoData, setChannelInfoData] = useState<ChannelInfo>({
    name: "VTuber",
    english_name: "VTuber",
    organization: "Independent",
    pfp_url: "",
    twitter_name: "",
    banner_url: "",
  } as ChannelInfo);

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
        const response = await fetch("/api/recent", {
          cache: 'no-store'
        });
        const data = await response.json();
        setRecentData(data);
      } catch (error) {
        console.error("Error loading recent data:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/info", {
          headers: {
            "Cache-Control": "no-store",
          },
        });
        const data = await response.json();
        setChannelInfoData(data);
      } catch (error) {
        console.error("Error loading channel info data:", error);
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

      <h1 className="text-center font-bold text-7xl my-8 transition-colors duration-1000 ease-in-out hover:text-accent">
        I Miss {recentData.channel_name}
      </h1>
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
          <h1 className="text-center font-semibold text-3xl mt-4">
            {recentData.channel_name} is{" "}
            <span className="font-bold text-red-500">not</span> live right now
          </h1>
          <h1 className="text-center mt-4 text-2xl">Most recent activity:</h1>
          <h1 className="text-center font-extrabold mt-2 text-2xl">
            <a href={`https://youtube.com/watch?v=${recentData.video_id}`}>
              {recentData.title}
            </a>
          </h1>
          <h2 className="text-center text-2xl mt-4">
            {String(
              Math.floor(timeSinceLastActivity / 1000 / 60 / 60)
            ).padStart(2, "0")}{" "}
            hours{" "}
            {String(
              Math.floor((timeSinceLastActivity / 1000 / 60) % 60)
            ).padStart(2, "0")}{" "}
            minutes{" "}
            {String(Math.floor((timeSinceLastActivity / 1000) % 60)).padStart(
              2,
              "0"
            )}{" "}
            seconds ago
          </h2>
        </>
      )}
      <div className="p-4">
        <CopeButton
          onClick={handleCopeButtonClick}
          buttonText={recentData.is_live ? "Yipee!" : "Cope"}
          buttonImgUrl="https://files.pinapelz.com/rguk27.gif"
          imgWidth="250px"
          imgHeight="250px"
        />
      </div>

      <h2 className="text-center text-lg">{copeButtonClickCount} times</h2>
      <Navbar />
      <ChannelCard
        name={channelInfoData.name}
        profilePicture={channelInfoData.pfp_url}
        organization={channelInfoData.organization}
        twitterName={channelInfoData.twitter_name}
        channel_id={recentData.channel_id}
      />
      <Footer
        message={
          "Not affiliated with " +
          (recentData.affiliation
            ? recentData.affiliation
            : recentData.channel_name)
        }
      />
    </>
  );

  interface VideoData {
    is_live: boolean;
    channel_name: string;
    channel_id: string;
    affiliation: string;
    title: string;
    video_id: string;
    time_started?: string;
    time_ended?: string;
  }

  interface ChannelInfo {
    name: string;
    english_name: string;
    organization: string;
    pfp_url: string;
    twitter_name: string;
    banner_url: string;
  }
}
