# Stage 1: Build the React Application
FROM node:18-alpine AS build
WORKDIR /app

# 1. Copy the package files from your ROOT directory
COPY package*.json ./
RUN npm install --legacy-peer-deps

# 2. Copy the ACTUAL frontend folder (this is the missing step)
COPY frontend/ ./frontend/

# 3. Move INTO the frontend folder to run the build
RUN cd frontend && npm run build

# Stage 2: Build the Python Flask Application
FROM python:3.9-slim
WORKDIR /app

# System dependencies for scientific packages
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

# 4. Install Backend Dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy backend source
COPY backend/ ./backend/

# 6. Copy React build output from Stage 1
# Since we built inside /app/frontend, the output is in /app/frontend/build
COPY --from=build /app/frontend/build ./build

# Run from the backend directory
WORKDIR /app/backend

# Use Gunicorn for production
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app