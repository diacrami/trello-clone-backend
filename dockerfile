# ---------------------------------------------------
# 🚀 Dockerfile.staging para NestJS + Prisma en GCP
# ---------------------------------------------------

# Etapa 1: build (compila el código y genera el cliente Prisma)
FROM node:18-alpine AS builder

WORKDIR /app

# Copia dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el código fuente
COPY . .

# Compila TypeScript → dist/
RUN npm run build

# ---------------------------------------------------
# Etapa 2: runtime (limpia, segura, sin devDeps)
FROM node:18-alpine

WORKDIR /app

# Por seguridad, Prisma se usará con cliente ya generado.
# NO ejecutamos migraciones aquí. Las haces tú antes del deploy.

# Variables de entorno se inyectan vía GCP (`--set-env-vars`)

# Puerto expuesto por NestJS
EXPOSE 3000

# Comando para staging (igual a producción si usas start:prod)
CMD ["npm", "run", "start:staging"]