FROM node:18.20.2-alpine AS build
WORKDIR /app
COPY package.json .
RUN mkdir node_modules
RUN npm install --verbose
COPY . .

ARG BACKEND_URL
ENV BACKEND_URL=$BACKEND_URL

RUN echo "BACKEND_URL: ${BACKEND_URL}"
RUN node dockerize/scripts/change-backend-url.js ${BACKEND_URL}
RUN npm run build

FROM nginx:alpine

COPY --from=build app/dist/aemet-marc-frontend/browser /usr/share/nginx/html
COPY --from=build app/dockerize/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]