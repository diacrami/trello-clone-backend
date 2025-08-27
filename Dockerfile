# Usa Node.js 18 como base
FROM node:18-alpine

# Crea un directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install --only=production

# Copia el resto del código
COPY . .

# Expón el puerto
EXPOSE 9000

# Comando de inicio
CMD ["npm", "run", "start:staging"]