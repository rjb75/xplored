package main

import (
	"fmt"
	"log"
	"os"

	"github.com/alexishamrak/xplored-reviews/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"

	_ "github.com/lib/pq"
)

func main() {
	app := fiber.New()

	//Setting up Environment Variables
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	//Configure all Routes
	routes.RegisterRoutes(app)

	//Formatting port
	SERVER_PORT := os.Getenv("REVIEWS_PORT")
	port := fmt.Sprintf(":%s", SERVER_PORT)
	app.Listen(port)
}
