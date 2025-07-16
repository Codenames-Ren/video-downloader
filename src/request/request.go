package request

type DownloadRequest struct {
	URL string `json:"url" binding:"required"`
	Title string `json:"title"`
}