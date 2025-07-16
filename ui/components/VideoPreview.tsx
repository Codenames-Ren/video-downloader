"use client";

import { VideoInfo } from "@/types/Video";
import Image from "next/image";
import { Button } from "./ui/button";
import { Download, RotateCcw } from "lucide-react";
import { useState } from "react";

interface Props {
  info: VideoInfo;
  onReset: () => void;
}

export default function VideoPreview({ info, onReset }: Props) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    console.log("INFO URL:", info.url); // ✅ Tambahin log ini

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: info.url,
          title: info.title || "video",
        }),
      });

      if (!res.ok) throw new Error("Gagal download video");

      const blob = await res.blob();
      const blobURL = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobURL;
      a.download = `${info.title || "video"}.mp4`;
      a.click();
      window.URL.revokeObjectURL(blobURL);
    } catch (err) {
      alert("Download gagal. Coba lagi nanti.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4 bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow-md border">
      <div className="aspect-video relative w-full rounded-lg overflow-hidden">
        <Image
          src={
            info.thumbnail
              ? info.thumbnail
              : `/placeholder.jpeg?ts=${Date.now()}`
          }
          alt={info.title || "Video Thumbnail"}
          fill
          className="object-cover"
        />
      </div>

      <h2 className="text-xl font-semibold text-center">{info.title}</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          {downloading ? "Downloading..." : "Download"}
        </Button>
        <Button onClick={onReset} className="w-full">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
