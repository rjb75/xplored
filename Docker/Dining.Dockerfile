FROM golang:1.17 AS build

WORKDIR /go/src/dining

COPY /microservices/dining/ .

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -o dining .

FROM alpine:latest

WORKDIR /xplored

COPY .env .env

WORKDIR /xplored/microservices/dining

COPY --from=build /go/src/dining/dining .

EXPOSE 3002

CMD ["./dining"]