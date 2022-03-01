package routes

import (
	"context"
	"log"

	firebase "firebase.google.com/go"
	"github.com/gofiber/fiber/v2"

	"github.com/rjb75/xplored-api-gateway/handlers"
	"github.com/rjb75/xplored-api-gateway/middleware"
	"google.golang.org/api/option"
)

func RegisterRoutes(app *fiber.App) {

	// initialize firebase
	opt := option.WithCredentialsFile("firebase-config.json")
	fba, err := firebase.NewApp(context.Background(), nil, opt)

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
	}))

	// TODO: add auth here

	v1.Get("/success", handlers.SuccessHandler)
	v1.Get("/fail", handlers.FailHandler)

	// Authenticated routes go here
	FrontendProtectedRoutes(app)

	DiningRoutes(v1)
}
