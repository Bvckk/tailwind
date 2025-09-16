# buil image
# docker-compose build
# Chạy containers
# docker-compose up -d

# Stage 1: Build fontend
FROM node:20 as build

# Thiết lập working directory
WORKDIR /app

# Copy package.json + package-lock.json và cài dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ source code
COPY . .
RUN npm run build

# Stage 2: Production Image
FROM nginx:stable-alpine

# copy frontend để build vào Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# build: lấy files state build FROM node:20 as build
# /app/dist: thư mục đầu ra khi chạy npm run build
# /usr/share/ngĩn/html: thư mục mặc định Nginx

# Expose port frontend và API
EXPOSE 5173 3001

# chạy Ngĩn foreground
CMD ["nginx", "-g", "daemon off;"]






