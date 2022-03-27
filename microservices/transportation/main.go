package main

import (
	"fmt"
	"log"
	"os"

	"github.com/Risath18/xplored-transportation/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"

	_ "github.com/lib/pq"
)


func main() {
	app := fiber.New()

	err := godotenv.Load("../../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	//Configure all Routes
	routes.RegisterRoutes(app)

	//Formatting port
	PLANNER_PORT := os.Getenv("TRANSPORTATION_PORT")
	port := fmt.Sprintf(":%s", PLANNER_PORT)
	app.Listen(port)

}



