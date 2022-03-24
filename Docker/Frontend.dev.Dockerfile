FROM node:17-alpine

WORKDIR /xplored

COPY .env .env

WORKDIR /xplored/frontend

COPY /frontend/package.json .
COPY /frontend/yarn.lock .

RUN yarn install

CMD ["yarn", "start"]