# Sử dụng image Node.js nhẹ
FROM node:18-alpine AS base

# Cài đặt các thư viện cần thiết
RUN apk add --no-cache libc6-compat

# Tạo thư mục làm việc
WORKDIR /app

# Copy file package.json và lockfile vào container
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# # Xóa package-lock.json nếu chỉ dùng Yarn
# RUN rm -f package-lock.json

# Cài đặt dependencies
RUN npm install --frozen-lockfile

# Copy toàn bộ mã nguồn vào container
COPY . .

# Expose cổng mà Express sử dụng
EXPOSE 3001
# Thiết lập các biến môi trường



# Chạy ứng dụng Express
CMD ["node", "server.js"]
