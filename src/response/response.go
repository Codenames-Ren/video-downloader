package response

type Response struct {
	Status  string      `json:"status"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

func SuccessResponse(data interface{}) Response {
	return Response{
		Status: "success",
		Data:   data,
	}
}

func ErrorResponse(message string) Response {
	return Response{
		Status:  "error",
		Message: message,
	}
}
