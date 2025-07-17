# 🎬 Multi-Platform Video Downloader

A powerful and user-friendly video downloader application that supports multiple social media platforms. Built with modern technologies for optimal performance and user experience.

## ✨ Features

- **Multi-Platform Support**: Download videos from YouTube, Facebook, Twitter/X, and TikTok
- **YouTube Reels**: Specialized support for YouTube Shorts/Reels
- **Modern UI**: Clean and intuitive interface built with Next.js
- **Fast Backend**: High-performance Go backend with Gin framework
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Real-time Progress**: Live download progress tracking
- **Video Quality Options**: Multiple quality formats available

## 🛠️ Tech Stack

**Frontend:**
- Next.js - React framework for production
- Tailwind CSS - Utility-first CSS framework
- TypeScript - Type-safe JavaScript

**Backend:**
- Go (Golang) - High-performance backend language
- Gin - Web framework for Go
- CORS - Cross-origin resource sharing

**Video Processing:**
- yt-dlp - Powerful video extraction tool

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Go](https://golang.org/dl/) (version 1.19+)
- [Node.js](https://nodejs.org/) (version 16+)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) 

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Codenames-Ren/video-downloader.git
   cd video-downloader
   ```

2. **Setup Backend**
   ```bash
   # From root directory
   go mod download
   go run main.go
   ```

3. **Setup Frontend**
   ```bash
   cd ui
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8080`

## 🏗️ Architecture

This project follows a clean architecture pattern with separated concerns:

**Backend (Go + Gin):**
- `main.go` - Application entry point and server configuration
- `src/controller/` - HTTP request handlers
- `src/service/` - Business logic layer
- `src/routes/` - API route definitions
- `src/request/` - Request validation structures
- `src/response/` - Response formatting structures
- `src/utils/` - Utility functions and helpers

**Frontend (Next.js):**
- `ui/` - Complete Next.js application structure
- Modern React components with TypeScript support
- Tailwind CSS for styling

## 📖 Usage

1. **Launch the application** by running both backend and frontend servers
2. **Open your browser** and navigate to `http://localhost:3000`
3. **Paste the video URL** from any supported platform
4. **Select video quality** (if available)
5. **Click download** and wait for the process to complete
6. **Download will start automatically** once processing is finished

### Supported Platforms

| Platform | URL Format | Features |
|----------|------------|----------|
| YouTube | `https://youtube.com/watch?v=...` | Regular videos, Shorts/Reels |
| Facebook | `https://facebook.com/...` | Public videos |
| Twitter/X | `https://twitter.com/...` | Video tweets |
| TikTok | `https://tiktok.com/@.../video/...` | Public videos |

## 🔧 Configuration

### Backend Configuration

The backend server can be configured in `main.go`:

```go
// Server configuration
port := ":8080"
allowedOrigins := []string{"http://localhost:3000"}
```

### Frontend Configuration

Update the API endpoint in your frontend configuration:

```javascript
// ui/config.js or ui/src/config.js
const API_BASE_URL = "http://localhost:8080"
```

## 📁 Project Structure

```
video-downloader/
├── main.go                 # Application entry point
├── go.mod                  # Go dependencies
├── go.sum                  # Go dependency checksums
├── src/                    # Backend source code
│   ├── controller/         # HTTP request handlers
│   ├── service/           # Business logic layer
│   ├── routes/            # API route definitions
│   ├── request/           # Request validation structures
│   ├── response/          # Response formatting structures
│   └── utils/             # Utility functions
├── ui/                     # Frontend Next.js application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   ├── public/
│   ├── package.json
│   └── next.config.js
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This tool is for educational purposes only. Please respect the terms of service of the platforms you're downloading from and ensure you have the right to download the content.

## 🙏 Acknowledgments

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - The powerful video extraction tool
- [Gin](https://github.com/gin-gonic/gin) - HTTP web framework for Go
- [Next.js](https://nextjs.org/) - React framework for production

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/Codenames-Ren/video-downloader/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your setup and the issue

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Codenames-Ren">Codenames-Ren</a>
</p>

<p align="center">
  <a href="https://github.com/Codenames-Ren/video-downloader/stargazers">⭐ Star this repo if you find it helpful!</a>
</p>
