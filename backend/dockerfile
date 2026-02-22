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