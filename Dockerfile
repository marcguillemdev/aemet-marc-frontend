FROM node:18.20.2-alpine AS build
WORKDIR /app
COPY package.json .
RUN mkdir node_modules
RUN npm install --verbose
COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build app/dist/aemet-marc-frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]