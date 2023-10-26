FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE ${PORT:-3000}

CMD ["node", "index.js"]
