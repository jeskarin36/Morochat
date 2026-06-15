FROM node:20-alpine

WORKDIR /app

# Le decimos explícitamente que busque dentro de la carpeta backend de tu laptop
COPY backend/package.json ./
COPY backend/package-lock.json* ./

RUN npm install

# Copia todo lo que está en backend hacia el contenedor
COPY backend/ ./

EXPOSE ${PORT:-3000}

CMD ["node", "dist/index.js"]