FROM golang:1.17 AS build

WORKDIR /go/src/reviews

COPY /microservices/reviews/ .

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -o reviews .

FROM alpine:latest

WORKDIR /xplored

COPY .env .env

WORKDIR /xplored/microservices/reviews

COPY --from=build /go/src/reviews/reviews .

EXPOSE 3004

CMD ["./reviews"]