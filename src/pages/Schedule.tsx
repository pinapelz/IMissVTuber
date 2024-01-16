import '../styles/LandingPage.css';
import ScheduleThumbnail from '../components/ScheduleThumbnail';
import VideoRow from '../components/VideoRow';
import Navbar from "../components/NavBar";

function SchedulePage(){
    return (
        <>
        <Navbar/>
        <ScheduleThumbnail/>
        <p>Scheduled Waiting Rooms:</p>
        <VideoRow/>
        </>
    )
}

export default SchedulePage;