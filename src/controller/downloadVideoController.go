package controller

import (
	"io"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"ren/video-downloader/src/request"

	"github.com/gin-gonic/gin"
)

func DownloadVideo(c *gin.Context) {
	var req request.DownloadRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid URL"})
		return
	}

	filename := "temp_download.mp4"
	filepath := filepath.Join(os.TempDir(), filename)

	cmd := exec.Command("yt-dlp", "-f", "mp4", "-o", filepath, req.URL)

	if err := cmd.Run(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "yt-dlp error"})
		return
	}

	// Buka file hasil download
	file, err := os.Open(filepath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal baca file"})
		return
	}
	defer file.Close()

	// Set headers
	c.Header("Content-Disposition", `attachment; filename="`+req.Title+`.mp4"`)
	c.Header("Content-Type", "video/mp4")
	c.Header("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")
	c.Header("Pragma", "no-cache")
	c.Header("Expires", "0")
	c.Status(http.StatusOK)

	io.Copy(c.Writer, file)

	// Optional: hapus setelah dikirim
	os.Remove(filepath)
}
