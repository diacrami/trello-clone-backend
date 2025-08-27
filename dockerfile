# ---- Etapa 1: Construcción ----
FROM node:18 AS build

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias de forma limpia y rápida
RUN npm ci --only=production

# Copiar el resto del código
COPY . .

# ---- Etapa 2: Imagen final ----
FROM node:18-slim

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias y código desde la imagen de build
COPY --from=build /app /app

# Configurar variables de entorno
ENV NODE_ENV=production
ENV PORT=8080

# Exponer puerto para Cloud Run
EXPOSE 8080

# Comando para iniciar la app
CMD ["node", "src/index.js"]
