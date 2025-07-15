package main

import (
	"os"
	"ren/video-downloader/src/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	//Register Routing
	routes.DownloadRoutes(router)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8001"
	}

	router.Run("0.0.0.0:" + port)
}