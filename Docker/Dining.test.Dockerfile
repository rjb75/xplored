FROM golang:1.17

WORKDIR /xplored

COPY .env .env

WORKDIR /xplored/microservices/dining

COPY /microservices/dining/ .

RUN go mod download

CMD ["go", "test", "./handlers"]