# Usa una imagen de Node.js estable
FROM node:18 AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración y dependencias
COPY package.json ./
COPY tsconfig.json ./
COPY craco.config.js ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente
COPY . .

# Fija la variable de entorno para evitar el error de OpenSSL
ENV NODE_OPTIONS="--openssl-legacy-provider"

# Construye la aplicación para producción
RUN npm run build


# ---------------------
# Fase final del contenedor para servir la aplicación con un servidor ligero
FROM nginx:stable-alpine

# Copia los archivos de construcción desde la fase anterior
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]