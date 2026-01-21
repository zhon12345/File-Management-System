FROM node:lts-alpine

RUN npm set proxy http://192.168.49.1:8228

WORKDIR /server

COPY package.json .
RUN npm install

COPY . .
