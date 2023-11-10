import '../styles/LandingPage.css';
import ScheduleThumbnail from '../components/ScheduleThumbnail';
import VideoRow from '../components/VideoRow';


function SchedulePage(){
    return (
        <>
        <ScheduleThumbnail/>
        <p>Scheduled Waiting Rooms:</p>
        <VideoRow/>
        </>
    )

}

export default SchedulePage;