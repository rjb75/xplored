package main

import (
	//	"fmt"

	"github.com/alexishamrak/xplored-reviews/handlers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func RegisterRoutes(app *fiber.App) {
	app.Use(cors.New())

	api := app.Group("/api")
	v1 := api.Group("/v1")
	v1.Get("/tags", handlers.SearchTag)

	//Api Version Configuration
	// microservice := app.Group("/reviews") // /api
	// api := microservice.Group("/api") // /api
	// v1 := api.Group("/v1")   // /api/v1

	// reviewsRoutes(v1)
}

// func reviewsRoutes(v fiber.Router) {
// 	v.Get("/:address/:keyword/:radius", GetReviewsOptions)
// }
