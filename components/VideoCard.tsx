import React from 'react';

interface VideoCardProps {
    video_id: string;
    title: string;
    startTime: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ video_id, title, startTime }) => {
    return (
        <div className="video-card">
            <a href={`https://youtube.com/watch?v=${video_id}`}>
                <img src={`https://img.youtube.com/vi/${video_id}/maxresdefault.jpg`} alt="Video Thumbnail" className="thumbnail" />
                <h3 className="title mt-2 text-xl">{title}</h3>
                <p className="start-time">{startTime}</p>
            </a>
        </div>
    );
};

export default VideoCard;