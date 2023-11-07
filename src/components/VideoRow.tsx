import '../styles/VideoRow.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
/*
Brute forcing the CSS for this. Tried to make tailwind equiv 
*/
function VideoRow() {

    interface Channel {
        name: string;
        english_name: string;
      }

    interface Video {
        title: string;
        id: string;
        available_at: string;
        channel: Channel;
      }

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [upcomingVideoData, setUpcomingVideoData] = useState([]);


    useEffect( () => {
        axios.get('https://imisserinya.vercel.app/api/upcoming')
            .then((response) => {
                console.log(response.data)
                setUpcomingVideoData(response.data || [])
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setError(error)
                setLoading(false)
            })
    }, [])


    if (loading){
        return(
        <p>Getting the upcoming videos...</p>
        );
    }

    if(error){
        return(
            <p>An error occurred while fetching data</p>
        )
    }

    

    if (Object.keys(upcomingVideoData).length === 0) {
        return(
            <p>No videos currently scheduled</p>
        )
    }

    return (
    <div className="container">
        {upcomingVideoData.map((video: Video, index: number) => (
            <a key={index} href={`https://youtube.com/watch?v=${video.id}`} className="card">
                <div className="image-container">
                    <img
                        alt={video.title}
                        className="image"
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    />
                </div>
                <div className="content">
                    <h2 className="title">{video.title}</h2>
                    <p className="channel-name">{video.channel.name}</p>
                    <div className="release-time">
                        <svg
                            className="icon"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(video.available_at))}</span>
                    </div>
                </div>
            </a>
        ))}
    </div>
    )
  }
export default VideoRow;