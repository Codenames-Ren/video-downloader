"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { VideoInfo } from "@/types/Video";
import { Loader2 } from "lucide-react";

interface Props {
  onFetch: (info: VideoInfo) => void;
  onError: (msg: string) => void;
}

export default function VideoForm({ onFetch, onError }: Props) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!url.trim()) {
      onError("URL tidak boleh kosong");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/download-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const text = await res.text();

      try {
        const data = JSON.parse(text);

        if (!res.ok) {
          const message =
            typeof data === "object" && "error" in data
              ? data.error
              : "Terjadi kesalahan tak dikenal.";
          onError(message);
        } else {
          onFetch({ ...data, url });
        }
      } catch {
        onError("Respons server tidak valid.");
      }
    } catch {
      onError("Terjadi kesalahan saat menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4 mb-4 ">
      <Input
        placeholder="Masukan URL video dari YouTube, TikTok, Instagram, atau Facebook"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="bg-blue-600 text-white shadow-[8px_8px_0px_black] hover:shadow-[2px_2px_0px_black] transition-all duration-200 border-black"
      />
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 w-full shadow-[8px_8px_0px_black] hover:shadow-[2px_2px_0px_black] transition-all duration-200 text-white border-black"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        {loading ? "Mengambil Info..." : "Get Info"}
      </Button>
    </div>
  );
}
