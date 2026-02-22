# Stage 1: Build React
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . . 
RUN npm run build

# Stage 2: Python Backend
FROM python:3.9-slim
WORKDIR /app

RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy everything
COPY . .

# Copy build from Stage 1 to the location Flask expects
COPY --from=build /app/build ./build

# Move to backend to run
WORKDIR /app/backend

# Explicitly bind to 0.0.0.0 and port 10000
CMD exec gunicorn --bind 0.0.0.0:10000 --workers 1 --threads 8 --timeout 0 main:app
# Stage 1: Build the React Application
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY public/ public/
COPY src/ src/
RUN npm run build

# Stage 2: Build the Python Flask Application
FROM python:3.9-slim
WORKDIR /app

# System dependencies for scientific packages
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Backend Dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source and artifacts
COPY backend/ ./backend/

# Copy React build from Stage 1 into the "build" folder that Flask expects
COPY --from=build /app/build ./build

# Run out of the backend directory so it finds the model and local scripts
WORKDIR /app/backend

# Use Gunicorn for production serving
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app
