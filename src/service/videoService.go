package service

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"net/url"
	"os/exec"
	"strings"
)

type VideoInfo struct {
	Title		string	`json:"title"`
	Thumbnail	string	`json:"thumbnail"`
	URL			string	`json:"url"`
}

func detectPlatform(videoURL string) string {
	u, err := url.Parse(videoURL)
	if err != nil {
		return "unknown"
	}

	host := u.Host
	switch {
	case strings.Contains(host, "tiktok.com"):
		return "tiktok"
	case strings.Contains(host, "facebook.com"), strings.Contains(host, "fb.watch"):
		return "facebook"
	case strings.Contains(host, "instagram.com"):
		return "instagram"
	case strings.Contains(host, "x.com"):
		return "x"
	case strings.Contains(host, "youtube.com"), strings.Contains(host, "youtu.be"):
		return "youtube"
	default:
		return "unknown"
	}
}

func ExtractVideoInfo(videoURL string) (*VideoInfo, error) {
	platform := detectPlatform(videoURL)

	args := []string{"-j", "--no-playlist"}

	switch platform {
	case "tiktok":
		args = append(args, "--referer", "https://www.tiktok.com/")
	
	case "facebook", "instagram":
		args = append(args, "--user-agent", "Mozilla/5.0")
	
	case "x":
		args = append(args, "--referer", "https://x.com/")
	}
	

	args = append(args, videoURL)
	
	//start yt-dlp with json output
	cmd := exec.Command("/yt-dlp-env/bin/yt-dlp", args...)

	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr


	if err := cmd.Run(); err != nil {
		stderrStr := stderr.String()

		switch {
		case strings.Contains(stderrStr, "HTTP Error 403"):
			return nil, errors.New("Akses ditolak oleh server (403 Forbidden). Mungkin video ini dibatasi atau tidak dapat diunduh.")
		case strings.Contains(stderrStr, "fragment") || strings.Contains(stderrStr, "DASH"):
			return nil, errors.New("Video ini tidak dapat diunduh karena menggunakan format streaming (DASH/HLS).")
		case strings.Contains(stderrStr, "playlist"):
			return nil, errors.New("URL mengarah ke playlist. Silakan gunakan URL video tunggal.")
		case strings.Contains(stderrStr, "Unsupported URL"):
			return nil, errors.New("URL tidak didukung. Pastikan URL berasal dari platform yang sesuai.")
		default:
			return nil, fmt.Errorf("Gagal menjalankan yt-dlp: %v", stderrStr)
		}
	}

	var data map[string]interface{}
	if err := json.Unmarshal(out.Bytes(), &data); err != nil {
		return nil, errors.New("gagal parsing JSON yt-dlp")
	}

	if data["_type"] == "playlist" {
		return nil, errors.New("URL mengarah ke playlist, bukan video tunggal")
	}

	if live, ok := data["is_live"].(bool); ok && live {
		return nil, errors.New("Video livestream tidak bisa di-download")
	}

	//Get important data
	title, _ := data["title"].(string)
	thumbnail, _ := data["thumbnail"].(string)

	formats, ok := data["formats"].([]interface{})
	if !ok || len(formats) == 0 {
		return nil, errors.New("tidak menemukan format video")
	}

	//search format by extension mp4 middle quality
	var bestURL string
	for _, f := range formats {
		format := f.(map[string]interface{})
		if url, ok := format["url"].(string); ok {
			ext := format["ext"].(string)
			if ext == "mp4" {
				formatNote, ok := format["format_note"].(string)
				if ok && strings.Contains(formatNote, "medium") {
					bestURL = url
					break
				}
			}

			//forced fallback
			if bestURL == "" {
				if url, ok := format["url"].(string); ok {
					bestURL = url
				}
			}
		}
	}

	if bestURL == "" {
		return nil, errors.New("Tidak menemukan URL Video")
	}

	return &VideoInfo{
		Title: 			title,
		Thumbnail: 		thumbnail,
		URL: 			bestURL,	
	}, nil
}