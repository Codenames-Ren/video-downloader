package controller

import (
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

func DownloadVideo(c *gin.Context) {
	var req DownloadRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid URL"})
		return
	}

	//Get info for video title
	res, err := http.Get(req.URL)
	if err != nil || res.StatusCode != http.StatusOK {
		c.JSON(http.StatusBadGateway, gin.H{"error": "Gagal mengambil video dari sumber"})
		return
	}
	defer res.Body.Close()

	//Browser Header for auto download
	c.Header("Content-Disposition", `attachment; filename="`+ req.Title +`.mp4"`)
	c.Header("Content-Type", "video/mp4")
	c.Header("Content-Length", res.Header.Get("Content-Length"))
	c.Status(http.StatusOK)

	io.Copy(c.Writer, res.Body)
}