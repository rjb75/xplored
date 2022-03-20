FROM golang:1.17 AS build

WORKDIR /go/src/poi

COPY /microservices/poi/ .

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -o poi .

FROM alpine:latest

WORKDIR /xplored

RUN mkdir /xplored/logs

COPY .env .env

WORKDIR /xplored/microservices/poi

COPY --from=build /go/src/poi/poi .

EXPOSE 3005

CMD ["./poi"]