"use client";
import { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function TimestampPage() {
  const [markdown, setMarkdown] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_TIMESTAMP_BASE_URL}${id}.md`) // ex. https://corsproxy.io/?https://gitlab.com/pinapelz/erina-makina-timestamps/-/raw/main/
      .then((response) => response.text())
      .then((data) => {
        setMarkdown(data);
      });
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="text-left">
        <div className="w-3/4 mx-auto">
          <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        </div>
      </div>
    </>
  );
}
