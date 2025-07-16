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
    <div className="bg-blue-600 w-full max-w-xl mx-auto space-y-4 p-4 rounded-xl border-4 border-black shadow-[16px_16px_0px_black] hover:shadow-[6px_6px_0px_black] transition-all duration-300">
      <div className="aspect-video relative w-full border-2 border-white rounded-xl overflow-hidden">
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

      <h2 className="text-xl font-semibold text-center text-white text-shadow-[2px_2px_0px_black]">
        {info.title}
      </h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleDownload}
          disabled={downloading}
          className="text-white w-full bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600 rounded-md shadow-[6px_6px_0px_black] hover:shadow-[1px_1px_0px_black] transition-all duration-200"
        >
          <Download className="w-4 h-4 mr-2" />
          {downloading ? "Downloading..." : "Download"}
        </Button>
        <Button
          onClick={onReset}
          className="w-full text-white bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600 rounded-md shadow-[6px_6px_0px_black] hover:shadow-[1px_1px_0px_black] transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
