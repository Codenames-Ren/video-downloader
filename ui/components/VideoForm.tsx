"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Alert } from "./ui/alert";
import { VideoInfo } from "@/types/Video";
import { Loader, Loader2 } from "lucide-react";

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

      const data = await res.json();

      if (!res.ok) {
        onError(data.error || "Gagal mengambil info video");
      } else {
        onFetch(data);
      }
    } catch (err) {
      onError("Terjadi kesalahan saat menghubungi server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      <Input
        placeholder="Masukan URL video dari YouTube, TikTok, Instagram, atau Facebook"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={loading} className="w-full">
        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        {loading ? "Mengambil Info..." : "Get Info"}
      </Button>
    </div>
  );
}
