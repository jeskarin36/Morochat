FROM node:20-alpine

WORKDIR /app

# 1. Copiamos las configuraciones de dependencias
COPY backend/package.json /app/
COPY backend/package-lock.json* /app/

# 2. Instalamos todas las dependencias (incluyendo las de desarrollo para poder hacer el build)
RUN npm install

# 3. Copiamos todo el código fuente de tu backend (aquí entra tu carpeta src)
COPY backend/ /app/

# 4. 🔥 ¡EL PASO CLAVE QUE FALTABA!: Le ordenamos a Docker compilar el proyecto en la nube
RUN npm run build

# 5. Avisamos el puerto
EXPOSE ${PORT:-3000}

# 6. Arrancamos la aplicación desde la carpeta dist recién creada
CMD ["node", "dist/index.js"]