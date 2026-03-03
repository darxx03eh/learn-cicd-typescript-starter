FROM --platform=linux/amd64 node:22-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Cloud Run يقرأ PORT من env
ENV PORT 8080
EXPOSE 8080

CMD ["node", "dist/main.js"]