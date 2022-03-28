FROM node:17-alpine

WORKDIR /xplored

COPY .env .env

WORKDIR /xplored/frontend

COPY /frontend/package.json .
COPY /frontend/yarn.lock .

RUN yarn install

COPY /frontend/public ./public
COPY /frontend/tsconfig.json .
COPY /frontend/webpack.config.js .

CMD ["yarn", "run","dev"]