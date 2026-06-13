FROM node:22.14.0-alpine AS build
WORKDIR /app
RUN npm install -g @angular/cli@19
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration=production
FROM nginx:alpine
COPY --from=build /app/dist/street-cats/browser /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
