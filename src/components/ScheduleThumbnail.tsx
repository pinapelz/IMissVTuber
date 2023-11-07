import axios from 'axios';
import React, {useEffect, useState} from 'react';



const ScheduleThumbnail = 
React.memo(function ScheduleThumbnail() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [thumbnail, setThumbnail] = useState("");

    useEffect(() => {
        axios.get('https://imisserinya.vercel.app/api/schedule')
            .then((response) => {
                console.log(response.data)
                setThumbnail(response.data.thumbnail)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setError(error)
                setLoading(false)
            })
    }, [])

    if(loading){
        return <p>Loading...</p>
    }
    if(error){
        return <p>An error occurred while fetching data</p>
    }

    return (
        <>
        <h1>Weekly Schedule</h1>
        <p>Let's hope Erina updated her schedule this week...</p>
        <img src={thumbnail} style={{ maxWidth: '100%', height: 'auto' }} alt="Schedule Thumbnail"/>
        </>
    )
});
export default ScheduleThumbnail;