# Imagen base oficial de Node.js
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiamos dependencias primero para aprovechar la cache
COPY package*.json ./

# Instalamos solo dependencias de producción
RUN npm install --only=production

# Copiamos el resto del proyecto
COPY . .

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Comando para iniciar la app
CMD ["npm", "run", "start:staging"]
