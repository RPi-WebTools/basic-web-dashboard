# 1. build stage
# this version of node can be used to create a Dockerfile for non-ARM arch:
# FROM node:lts-alpine as build-stage
FROM arm32v7/node:lts as build-stage
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2. prod stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]