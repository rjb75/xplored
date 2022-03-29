FROM golang:1.17

WORKDIR /xplored

COPY .env .env

WORKDIR /xplored/microservices/poi

COPY /microservices/poi/ .

RUN go mod download

CMD ["go", "test", "./handlers"]