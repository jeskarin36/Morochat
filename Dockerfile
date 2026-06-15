# 1. Usamos una versión ligera y oficial de Node.js (Alpine) ideal para servidores rápidos
FROM node:20-alpine

# 2. Creamos la carpeta dentro del contenedor donde vivirá tu aplicación
WORKDIR /app

# 3. Copiamos los archivos de configuración de dependencias para instalarlas dentro
COPY package*.json ./

# 4. Instalamos las dependencias de forma limpia y rápida para producción
RUN npm install

# 5. Copiamos TODO el resto del código de tu proyecto (incluyendo tu carpeta public si ya la tienes ahí)
COPY . .

# 6. EXPOSE le avisa a Docker qué puerto va a escuchar.
# Usamos la sintaxis ${PORT:-3000} para que tome el puerto dinámico de Render o PowerShell, 
# y si no encuentra ninguno, use el 3000 por defecto.
EXPOSE ${PORT:-3000}

# 7. El comando que arrancará tu backend en vivo
CMD ["node", "index.js"]