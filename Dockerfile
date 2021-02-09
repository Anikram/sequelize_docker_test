FROM node:15.8

WORKDIR /usr/src/app
COPY . .

ENV WEB_PORT=5000 \
    DB_PORT=5432 \
    NODE_ENV=development \
    DB_USER=postgres \
    DB_PASSWORD=postgres \
    DB_HOST=db \
    DB_PROVIDER=postgres \
    DB_DBNAME=seq_test

RUN yarn install

EXPOSE 5000

CMD ["yarn", "startDev"]