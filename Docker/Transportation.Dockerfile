FROM golang:1.17 AS build

WORKDIR /go/src/transportation

COPY /microservices/transportation/ .

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -o transportation .

FROM alpine:latest

WORKDIR /xplored

COPY .env .env

WORKDIR /xplored/microservices/transportation

COPY --from=build /go/src/transportation .

EXPOSE 3001

CMD ["./transportation"]