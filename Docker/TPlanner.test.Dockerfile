FROM maven:3.6.3-openjdk-11-slim

WORKDIR /xplored

COPY .env .env

WORKDIR /xplored/microservices/tplanner

COPY /microservices/tplanner/pom.xml .
COPY /microservices/tplanner/src ./src

RUN mvn install

CMD ["mvn", "test"]