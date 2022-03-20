package routes

import (
	"github.com/alexishamrak/xplored-reviews/microservices/reviews/handlers"
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
	v1.Post("/tag", handlers.PostTag)
	v1.Get("/alltags", handlers.AllReviews)
}
