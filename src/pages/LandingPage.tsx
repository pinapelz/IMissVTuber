import { useEffect, useState } from 'react';
import CurrentStatus from "../components/CurrentStatus";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import IMissButton from '../components/IMissButton';
import '../styles/LandingPage.css';  

interface StreamData {
  status: string;
  end_actual: string;
  channel: {
    name: string;
    english_name: string;
  };
  title: string;
  start_actual: string;
  id: string;
}

function LandingPage() {
    const [data, setData] = useState<StreamData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isRefetching, setIsRefetching] = useState(false);
    const [error, setError] = useState<unknown>(null);
    const [autoRefresh, setAutoRefresh] = useState(true);

    const fetchData = (initialFetch: boolean = false) => {
      if (!autoRefresh && !initialFetch) return;
      if (initialFetch) {
        setLoading(true);
      }
      setIsRefetching(true);
  
      fetch("https://imisserinya.vercel.app/api/live")
        .then(response => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((result: StreamData) => {
          setData(result);
          setLoading(false);
          setIsRefetching(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
          setIsRefetching(false);
        });
    };
  
    useEffect(() => {
      fetchData(true);
    }, []);
  
    const handleProgressComplete = () => {
      fetchData();
    };
  
    return (
      <div className="container">
        <CurrentStatus data={data} loading={loading || isRefetching} error={error} />
        <label>
          Auto-refresh:
          <input type="checkbox" checked={autoRefresh} onChange={() => setAutoRefresh(!autoRefresh)} /> {/* Checkbox to toggle auto-refresh */}
        </label>
        <IMissButton syncInterval={12000} />
        <ProgressBar onComplete={handleProgressComplete} />
        <Footer />
      </div>
    );
  }
  

export default LandingPage;