"use client";

import { VideoInfo } from "@/types/Video";
import Image from "next/image";
import { Button } from "./ui/button";
import { Download, RotateCcw } from "lucide-react";

interface Props {
  info: VideoInfo;
  onReset: () => void;
}

export default function VideoPreview({ info, onReset }: Props) {
  return (
    <div className="w-full max-w-xl mx-auto space-y-4 bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow-md border">
      <div className="aspect-video relative w-full rounded-lg overflow-hidden">
        <Image
          src={info.thumbnail}
          alt={info.title}
          fill
          className="object-cover"
        />
      </div>

      <h2 className="text-xl font-semibold text-center">{info.title}</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href={info.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </a>
        <Button onClick={onReset} className="w-full">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
