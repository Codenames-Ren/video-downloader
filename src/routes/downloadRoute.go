package routes

import (
	"ren/video-downloader/src/controller"

	"github.com/gin-gonic/gin"
)

func DownloadRoutes(router *gin.Engine) {
	api := router.Group("/api")
	{
		api.POST("/download", controller.DownloadVideo)
		api.POST("/download-info", controller.GetDownloadInfo)
	}
}