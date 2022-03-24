FROM golang:1.17 AS build

WORKDIR /xplored

COPY .env .env

WORKDIR /go/src/gateway

COPY /gateway/ .

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -o gateway .

FROM node:17-alpine

WORKDIR /xplored

COPY .env .env

WORKDIR /xplored/gateway

COPY --from=build /go/src/gateway/gateway .

EXPOSE 8000

CMD ["./gateway"]