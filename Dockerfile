# Imagen base oficial de Node.js
FROM node:18-alpine

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos solo dependencias de producción
RUN npm install --only=production

# Copiamos todo el proyecto
COPY . .

# Definimos variables de entorno
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Arrancamos la app desde src/index.js
CMD ["npm", "run", "start"]
