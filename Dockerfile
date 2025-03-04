FROM node:20-alpine

WORKDIR /app

# Cài đặt dependencies
COPY package*.json ./
RUN npm install

# Sao chép mã nguồn
COPY . .

# Biến môi trường
ENV NODE_ENV=production

# Build
RUN npm run build

# Mở cổng
EXPOSE 8000

# Chạy ở chế độ production
CMD ["npm", "run", "start"]