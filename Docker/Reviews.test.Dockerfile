FROM golang:1.17

WORKDIR /xplored

COPY .env .env

WORKDIR /xplored/microservices/reviews

COPY /microservices/reviews/ .

RUN go mod download

CMD ["go", "test", "./handlers"]