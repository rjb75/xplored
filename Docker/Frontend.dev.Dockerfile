FROM node:17

WORKDIR /xplored

COPY .env .

WORKDIR /xplored/frontend

COPY /frontend/package.json .
COPY /frontend/yarn.lock .

RUN yarn install

COPY /frontend/public /xplored/frontend/public
COPY /frontend/tsconfig.json .
COPY /frontend/webpack.config.js .

CMD ["yarn", "run", "dev"]