FROM golang:1.17 AS build

WORKDIR /go/src/gateway

COPY /gateway/ .

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -o gateway .

FROM node:17-alpine AS frontend

WORKDIR /xplored

COPY .env .env

WORKDIR /xplored/frontend

COPY /frontend/package.json .
COPY /frontend/yarn.lock .

RUN yarn install

ENV FRONTEND_ENV_MODE production

COPY /frontend/public/ ./public/
COPY /frontend/src/ ./src/
COPY /frontend/tsconfig.json .
COPY /frontend/webpack.config.js .

RUN yarn build

FROM alpine:latest

WORKDIR /xplored

COPY .env .env

WORKDIR /xplored/frontend/build

COPY --from=frontend xplored/frontend/build .

WORKDIR /xplored/gateway

COPY --from=build /go/src/gateway/gateway .

EXPOSE 8000

CMD ["./gateway"]