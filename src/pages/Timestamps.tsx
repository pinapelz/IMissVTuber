import '../styles/Timestamps.css';
import Markdown from 'react-markdown'
import { useEffect, useState } from 'react'
import remarkGfm from 'remark-gfm'
import { useLocation } from 'react-router-dom';
import Navbar from '../components/NavBar';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function TimestampsPage(){
    const [markdown, setMarkdown] = useState("");
    const query = useQuery();
    const id = query.get("id");

    useEffect(() => {
        fetch(`${import.meta.env.VITE_APP_TIMESTAMP_MD_BASE_URL}${id}.md`) // ex. https://corsproxy.io/?https://gitlab.com/pinapelz/erina-makina-timestamps/-/raw/main/
            .then(response => response.text())
            .then(data => {
                setMarkdown(data);
            });
    }, [id]);

    return (
        <>
        <Navbar />
        <div className="TimestampsPage">
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        </div>
        </>
    )
}

export default TimestampsPage;