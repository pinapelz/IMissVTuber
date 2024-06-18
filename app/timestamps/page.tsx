"use client";
import { Suspense, useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import '../../styles/Timestamps.css';

function MarkdownDocument() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [markdown, setMarkdown] = useState("");
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_TIMESTAMP_BASE_URL}${id}.md`) // ex. https://corsproxy.io/?https://gitlab.com/pinapelz/erina-makina-timestamps/-/raw/main/
      .then((response) => response.text())
      .then((data) => {
        setMarkdown(data);
      });
  }, [id]);

  return (
    <div className="text-left">
      <div className="w-3/4 mx-auto">
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      </div>
    </div>
  );
}

export default function TimestampPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <MarkdownDocument />
      </Suspense>
    </>
  );
}
