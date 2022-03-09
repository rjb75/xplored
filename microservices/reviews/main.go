package main

import (
	"context"
	"fmt"
	"log"
	"os"

	// "strconv"
	// "strings"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"

	// "go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	// "go.mongodb.org/mongo-driver/mongo/readpref"

	//"github.com/kr/pretty"
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
	RegisterRoutes(app)

	//Formatting port
	SERVER_PORT := os.Getenv("REVIEWS_PORT")
	port := fmt.Sprintf(":%s", SERVER_PORT)
	app.Listen(port)

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(REVIEWS_DB))

	if err != nil {
		panic(err)
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	//ping primary
	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
		panic(err)
	}

	fmt.Println("Successfully connected and pinged")
}
