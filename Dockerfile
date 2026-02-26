# Stage 1: Build the React Application
FROM node:18-alpine AS build
WORKDIR /app

# Point to the frontend folder for package files
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps

# Copy all files from your frontend folder into the container
COPY frontend/ . 
RUN npm run build

# Stage 2: Build the Python Flask Application
FROM python:3.9-slim
WORKDIR /app

RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./backend/

# Copy the build output from the /app/build directory created in Stage 1
COPY --from=build /app/build ./build

WORKDIR /app/backend

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app