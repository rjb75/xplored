# Docker Implementation

The Xplored project utilizes a containerized approach for microservices. In the deployed implementation each microservice has it's own container which is then networked with the gateway container. This means that only the gateway container will be exposed when the project is hosted.

## Deploying the Application

The deployment of the application is completed using `docker-compose` which aggregates each container and connects them. If your `.env` is properly configured in the root directory the entire application can be ran using the following command in the project root:

```bash
$ docker-compose -f Docker/docker-compose.yml up --build
```

## Building Individual Containers

To build an individual container navigate to the root project folder and run the following command:

```bash
$ docker build -t <container tag> -f <path to docker file> .
```

## Running Individual Containers

To run an individual container for a microservice ensure that the the `.env` file exists in the parent folder. Once the Docker image is built it can be ran with the following command:

```bash
$ docker run -d -p <app port>:<local port> <container tag>
```

*Note:* this will run your container in detached mode (i.e. in the background). Omitting the `-d` flag in the above command will show the output of the container in your current terminal.