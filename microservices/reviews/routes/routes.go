package routes

import (
	//	"fmt"

	"github.com/alexishamrak/xplored-reviews/handlers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func RegisterRoutes(app *fiber.App) {
	app.Use(cors.New())

	//Api Version Configuration
	microservice := app.Group("/reviews") // /api
	api := microservice.Group("/api")
	v1 := api.Group("/v1")
	v1.Get("/tags", handlers.SearchTag)

	// reviewsRoutes(v1)
}

// func reviewsRoutes(v fiber.Router) {
// 	v.Get("/:address/:keyword/:radius", GetReviewsOptions)
// }
