package main

import (
	"os"
	"ren/video-downloader/src/routes"
	"time"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins: 		[]string{"http://localhost","http://localhost:3002"}, //Change this in Production!
		AllowMethods: 		[]string{"GET", "POST"},
		AllowHeaders: 		[]string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders: 		[]string{"Content-Length"},
		AllowCredentials: 	true,
		MaxAge: 			12* time.Hour,
	}))

	//Register Routing
	routes.DownloadRoutes(router)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8001"
	}

	router.Run("0.0.0.0:" + port)
}