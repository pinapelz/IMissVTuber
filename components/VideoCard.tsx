import React from 'react';

interface VideoCardProps {
    thumbnail: string;
    title: string;
    startTime: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ thumbnail, title, startTime }) => {
    return (
        <div className="video-card">
            <img src={thumbnail} alt="Video Thumbnail" className="thumbnail" />
            <h3 className="title mt-2 text-xl">{title}</h3>
            <p className="start-time">{startTime}</p>
        </div>
    );
};

export default VideoCard;