# =========================
# 1. Base image
# Use the lightweight Alpine version of Node.js
# =========================
FROM node:20-alpine

# =========================
# 2. Set working directory
# =========================
WORKDIR /app

# =========================
# 3. Copy package.json and package-lock.json first
# This helps Docker cache npm install layers
# =========================
COPY package*.json ./

# =========================
# 4. Install dependencies
# =========================
RUN npm install -g npm@11.5.2
RUN npm install

# =========================
# 5. Copy source code
# =========================
COPY . .

# =========================
# 6. Set environment variables
# You can override these in docker-compose.yml or Kubernetes
# =========================
ENV PORT=3000
ENV NODE_ENV=development
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
# =========================
# 7. Expose API port
# =========================
EXPOSE 3000

# =========================
# 8. Run the service
# =========================
ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "run", "default"]
