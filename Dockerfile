FROM node:18-alpine

WORKDIR /app

# Copiar dependencias primero
COPY package*.json ./

# Instalar TODAS las dependencias (incluyendo dev) para poder compilar
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar a dist/ (si usas TypeScript)
RUN npm run build

# Solo dejar dependencias necesarias en producción
RUN npm prune --production

ENV PORT=8080
EXPOSE 8080

CMD ["npm", "run", "start:staging"]
