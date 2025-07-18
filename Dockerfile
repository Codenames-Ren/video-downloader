# === Build Frontend (Next.js) ===
FROM node:current-alpine3.22 AS frontend

WORKDIR /app
COPY ui/package.json ui/package-lock.json ./
RUN npm install
COPY ui/ .
RUN npm run build


# === Build Backend (Go + yt-dlp) ===
FROM golang:1.24 AS backend

# Install dependencies
RUN apt-get update && apt-get install -y \
    wget \
    ffmpeg \
    python3 \
    python3-venv \
    && apt-get clean

# Buat virtual env & install yt-dlp 
RUN python3 -m venv /yt-dlp-env \
    && /yt-dlp-env/bin/pip install --upgrade pip \
    && /yt-dlp-env/bin/pip install yt-dlp

# Tambahkan ke PATH agar bisa dipanggil langsung via shell
ENV PATH="/yt-dlp-env/bin:$PATH"

WORKDIR /app

# Copy dan build Go app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o app .

# Copy frontend build result
COPY --from=frontend /app/.next /app/public/.next
COPY --from=frontend /app/public /app/public
COPY --from=frontend /app/node_modules /app/public/node_modules
COPY --from=frontend /app/package.json /app/public/package.json

# Jalankan Go app
EXPOSE 8080
CMD ["./app"]
