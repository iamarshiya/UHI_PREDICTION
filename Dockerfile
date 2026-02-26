# Stage 1: Build the React Application
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . . 
RUN npm run build

# Stage 2: Build the Python Flask Application
FROM python:3.9-slim
WORKDIR /app

# System dependencies for scientific packages
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

# Install Backend Dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY backend/ ./backend/

# Copy React build from Stage 1 into the folder Flask expects
COPY --from=build /app/build ./build

# Run from the backend directory
WORKDIR /app/backend

# Use Gunicorn for production serving on Cloud Run
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app