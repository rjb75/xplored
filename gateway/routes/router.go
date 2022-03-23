package routes

import (
	"context"
	"log"
	"os"

	firebase "firebase.google.com/go"
	"github.com/gofiber/fiber/v2"

	"github.com/rjb75/xplored-api-gateway/handlers"
	"github.com/rjb75/xplored-api-gateway/middleware"
	"google.golang.org/api/option"
)

func RegisterRoutes(app *fiber.App) {

	firebase_config := new(firebase.Config)

	// initialize firebase config from environment
	firebase_config.ProjectID = os.Getenv("FIREBASE_PROJECT_ID")
	firebase_config.StorageBucket = os.Getenv("FIREBASE_STORAGE_BUCKET")

	// initialize firebase

	// use API key from environment for authentication
	opt := option.WithAPIKey(os.Getenv("FIREBASE_API_KEY"))

	// opt := option.WithCredentialsFile("firebase-config.json")
	fba, err := firebase.NewApp(context.Background(), firebase_config, opt)

	if err != nil {
		log.Fatal("error connecting to firebase")
	}

	// Add frontend routes
	FrontendRoutes(app)

	// Non-authenticated routes here

	api := app.Group("/api")
	v1 := api.Group("/v1")

	// Check user authentication status
	app.Use(middleware.NewAuth(middleware.AuthConfig{
		FirebaseApp: fba,
		IgnorePaths: []string{"/login$", "/robots.txt$", "/manifest.json$"},
	}))

	v1.Get("/success", handlers.SuccessHandler)
	v1.Get("/fail", handlers.FailHandler)

	// Authenticated routes go here
	FrontendProtectedRoutes(app)

	DiningRoutes(v1)
	PhotoRoutes(v1)
	ReviewsRoutes(v1)
}
