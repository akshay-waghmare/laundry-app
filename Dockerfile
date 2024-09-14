# Stage 1: Build the Angular application
FROM node:8.9.0-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/id-card-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the sw.js to the web root as a part of propeller verification task
COPY sw.js /usr/share/nginx/html/
