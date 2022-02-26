package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"github.com/rjb75/xplored-poi/logs"
	"github.com/rjb75/xplored-poi/routes"
)

func main() {

	err := godotenv.Load("../../.env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	logs.InitLogs()

	app := fiber.New()

	routes.RegisterRoutes(app)

	port := fmt.Sprintf(":%s", os.Getenv("POI_PORT"))

	app.Listen(port)
}
