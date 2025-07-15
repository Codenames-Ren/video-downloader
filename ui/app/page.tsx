"use client";

import { useState } from "react";
import { VideoInfo } from "@/types/Video";
import VideoForm from "@/components/VideoForm";
import VideoPreview from "@/components/VideoPreview";
import ErrorAlert from "@/components/ErrorAlert";
import EmptyState from "@/components/EmptyState";

export default function Home() {
  const [info, setInfo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  return (
    <main className="min-h-screen w-full px-4 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Multi Video Downloader
      </h1>

      <VideoForm
        onFetch={(data) => {
          setInfo(data);
          setError(null);
        }}
        onError={(msg) => {
          setError(msg);
          setInfo(null);
        }}
      />

      {error && <ErrorAlert message={error} />}
      {info ? (
        <VideoPreview
          info={info}
          onReset={() => {
            setInfo(null);
            setError(null);
          }}
        />
      ) : (
        <EmptyState />
      )}

      {info && <VideoPreview info={info} onReset={() => setInfo(null)} />}
    </main>
  );
}
