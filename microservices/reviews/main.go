package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"

	//"github.com/kr/pretty"
	_ "github.com/lib/pq"
	"googlemaps.github.io/maps"
)


func main() {
	app := fiber.New()

	//Setting up Environment Variables
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	//Configure all Routes
	RegisterRoutes(app)

	//Formatting port
	SERVER_PORT := os.Getenv("REVIEWS_PORT")
	port := fmt.Sprintf(":%s", SERVER_PORT)
	app.Listen(port)
}

