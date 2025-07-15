package controller

import (
	"io"
	"net/http"
	"os/exec"
	"ren/video-downloader/src/service"

	"github.com/gin-gonic/gin"
)

func DownloadVideo(c *gin.Context) {
	var req DownloadRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "URL tidak valid"})
		return
	}

	//Get info for video title
	info, err := service.ExtractVideoInfo(req.URL)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil info video"})
		return
	}

	//start yt-dlp, format mp4 output ke stdout
	cmd := exec.Command("yt-dlp", "-f", "mp4", "-o", "-", req.URL)
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuka stdout yt-dlp"})
		return
	}

	if err := cmd.Start(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menjalankan yt-dlp"})
		return
	}

	//Browser Header for auto download
	c.Header("Content-Disposition", `attachment; filename="`+info.Title+`.mp4`)
	c.Header("Content-Type", "video/mp4")
	c.Status(http.StatusOK)

	//stream to client
	_, copyErr := io.Copy(c.Writer, stdout)
	if copyErr != nil {
		c.Error(copyErr)
		return
	}

	cmd.Wait()
}