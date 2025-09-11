# Sử dụng Node.js 20+ để tương thích Vite 7+
FROM node:20

# Thiết lập working directory
WORKDIR /app

# Copy package.json + package-lock.json và cài dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ source code
COPY . .

# Expose port frontend và API
EXPOSE 5173 3001

# Chạy cả frontend + API song song
CMD ["npx", "concurrently", "npm run api", "npm run dev"]
