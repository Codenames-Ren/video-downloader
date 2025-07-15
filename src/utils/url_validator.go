package utils

import "regexp"

func IsValidURL(url string) bool {
	regex := regexp.MustCompile(`^https?://`)
	return regex.MatchString(url)
}