# =========================
# 1. Base image
# Use the lightweight Alpine version of Node.js
# =========================
FROM node:20-alpine AS builder

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
RUN npm install

# =========================
# 5. Copy source code
# =========================
COPY . .

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
 
EXPOSE 3000

CMD ["node", "src/index.js"]
