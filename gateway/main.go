package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/rjb75/xplored-api-gateway/routes"
)

func main() {

	app := fiber.New()

	err := godotenv.Load("../.env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	routes.RegisterRoutes(app)

	SERVER_PORT := os.Getenv("GATEWAY_PORT")
	port := fmt.Sprintf(":%s", SERVER_PORT)
	app.Listen(port)
}
