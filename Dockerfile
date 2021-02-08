FROM node:15.8

WORKDIR /usr/src/app
COPY . .

RUN yarn install

EXPOSE 5000
CMD yarn startDev