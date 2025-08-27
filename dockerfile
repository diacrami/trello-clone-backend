# ---------------------------------------------------
# 🚀 Dockerfile.staging para NestJS + Prisma en GCP
# ---------------------------------------------------

# Etapa 1: build (compila el código y genera el cliente Prisma)
FROM node:18-alpine AS builder

WORKDIR /app

# Copia dependencias
COPY p# Dockerfile for development


# Dockerfile for development
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

#prod
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]ackage*.json ./

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

# Puerto expuesto por Node
EXPOSE 9000

# Comando para staging (igual a producción si usas start:prod)
CMD ["npm", "run", "start:staging"]