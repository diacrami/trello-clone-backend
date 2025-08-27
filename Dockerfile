FROM node:18-alpine

WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos TODAS las dependencias (no solo prod, porque necesitamos TypeScript)
RUN npm install

# Copiamos el resto del código
COPY . .

# Compilamos el proyecto dentro del contenedor
RUN npm run build

# Configuramos variables de entorno
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Ejecutamos el archivo compilado
CMD ["node", "dist/main"]
