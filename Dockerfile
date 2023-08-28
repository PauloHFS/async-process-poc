# syntax=docker/dockerfile:experimental
FROM node:lts-buster
WORKDIR /server
COPY . .
EXPOSE 8080
RUN npm install
RUN npm run build
CMD [ "npm", "run", "start" ]