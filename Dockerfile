FROM --platform=linux/amd64 node:22-slim

WORKDIR /usr/src/app

# نسخ ملفات package.json فقط لتسريع cache
COPY package*.json ./
RUN npm ci

# نسخ كل الملفات
COPY . .

# Build داخل الحاوية
RUN npm run build

# Cloud Run يتوقع PORT
ENV PORT 8080
EXPOSE 8080

# تشغيل السيرفر
CMD ["node", "dist/main.js"]