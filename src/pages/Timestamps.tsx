import '../styles/Timestamps.css';
import Markdown from 'react-markdown'
import { useEffect, useState } from 'react'
import remarkGfm from 'remark-gfm'
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function TimestampsPage(){
    const [markdown, setMarkdown] = useState("");
    const query = useQuery();
    const id = query.get("id");

    useEffect(() => {
        fetch(`https://corsproxy.io/?https://gitlab.com/pinapelz/erina-makina-timestamps/-/raw/main/${id}.md`)
            .then(response => response.text())
            .then(data => {
                console.log(data);
                setMarkdown(data);
            });
    }, [id]);

    return (
        <div className="TimestampsPage">
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        </div>
    )
}

export default TimestampsPage;