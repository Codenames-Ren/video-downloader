package controller

import (
	"net/http"
	"ren/video-downloader/src/response"
	"ren/video-downloader/src/service"
	"ren/video-downloader/src/utils"

	"ren/video-downloader/src/request"

	"github.com/gin-gonic/gin"
)

func GetDownloadInfo(c *gin.Context) {
	var req request.DownloadRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, response.ErrorResponse("URL tidak valid"))
		return
	}

	if !utils.IsValidURL(req.URL) {
		c.JSON(http.StatusBadRequest, response.ErrorResponse("Format URL tidak valid"))
		return
	}

	println("Received URL:", req.URL)

	info, err := service.ExtractVideoInfo(req.URL)
	if err != nil {
		println("Service Error:", err.Error())

		c.JSON(http.StatusInternalServerError, response.ErrorResponse("Gagal mengambil data video"))
		return
	}

	c.JSON(http.StatusOK, response.SuccessResponse(info))
}
