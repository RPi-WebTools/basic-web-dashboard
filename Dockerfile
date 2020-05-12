##########################################################################
# 1. build stage
# this version of node can be used to create a Dockerfile for non-ARM arch:
# FROM node:lts-alpine as build-stage
# FROM arm32v7/node:lts as build-stage
FROM arm32v7/node:lts-alpine as build-stage
WORKDIR /app

# add some packages needed to build node-sass from source
RUN apk add --no-cache --virtual .build-deps \
    python \
    make \
    g++

COPY package*.json ./
RUN npm install

# remove said packages again
RUN apk del .build-deps

COPY . .
RUN npm run build

##########################################################################
# 2. prod stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY prod-nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
