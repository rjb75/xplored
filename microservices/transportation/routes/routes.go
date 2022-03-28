package routes

import (
	"github.com/Risath18/xplored-transportation/handlers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

// function to register routes to application
func RegisterRoutes(app *fiber.App) {
	app.Use(cors.New())

	poi := app.Group("/transportation")
	api := poi.Group("/api")
	v1 := api.Group("/v1")

	v1.Get("/long", handlers.GetTransLong)
	v1.Get("/short", handlers.GetTransShort)
	v1.Get("/codes", handlers.GetAirportCode)

}
