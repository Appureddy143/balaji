# ---------- FRONTEND BUILD ----------
FROM node:18 AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# ---------- BACKEND ----------
FROM node:18

WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy backend
COPY backend ./backend

# Install Python
RUN apt-get update && apt-get install -y python3 python3-pip

# Copy AI service
COPY ai-service ./ai-service

# Install Python dependencies
RUN pip3 install --break-system-packages -r ai-service/requirements.txt

# Copy frontend build
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Install serve
RUN npm install -g serve concurrently

# Expose Render port
EXPOSE 10000

# Start all services
CMD concurrently \
"cd backend && node server.js" \
"cd ai-service && python3 app.py" \
"serve -s frontend/dist -l 10000"
