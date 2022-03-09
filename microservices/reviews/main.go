package main

import (
	"fmt"
	"log"
	"os"

	// "strconv"
	// "strings"

	"github.com/alexishamrak/xplored-reviews/handlers"
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
	// RegisterRoutes(app)

	//Formatting port
	SERVER_PORT := os.Getenv("REVIEWS_PORT")
	port := fmt.Sprintf(":%s", SERVER_PORT)

	api := app.Group("/api")
	v1 := api.Group("/v1")
	v1.Get("/tags", handlers.SearchTag)

	app.Listen(port)
}
