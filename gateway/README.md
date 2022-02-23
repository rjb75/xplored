# API Gateway

## How to run?

### Before Running

Ensure that the frontend has been built at least once or else there will be an error displaying anything at `/`. This can be done by running `yarn install` followed by `yarn build` in the frontend directory.

Also ensure that the port has been specified in the `.env` file in the root under `GATEWAY_PORT`.

### Instructions to Run

To run the API gateway ensure Go is installed on your maching and run the `main.go` file using the command `go run main.go`.