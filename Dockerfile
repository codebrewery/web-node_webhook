FROM node:6.10.0

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/package.json

RUN npm install --production

COPY ./bin /usr/src/app/bin/
COPY ./src /usr/src/app/src/

ENV NODE_ENV "production"

CMD npm start
