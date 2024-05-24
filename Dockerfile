FROM node:lts-buster
WORKDIR /server
COPY . .
EXPOSE 8080
RUN yarn
RUN yarn build
CMD [ "yarn", "start" ]