# Imagen base oficial de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias en modo producción
RUN npm install --only=production

# Copiar el resto del código
COPY . .

# Establecer el puerto para Cloud Run
ENV PORT=8080
EXPOSE 8080

# Comando para iniciar la app
CMD ["npm", "start:staging"]
