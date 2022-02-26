package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rjb75/xplored-poi/handlers"
)

// function to register routes to application
func RegisterRoutes(app *fiber.App) {
	poi := app.Group("/poi")
	api := poi.Group("/api")
	test := api.Group("/test")
	v1 := api.Group("/v1")

	TestRoutes(test)
	PointsOfInterest(v1)
}

// function to mount test routes
func TestRoutes(v fiber.Router) {
	v.Get("/success", handlers.SuccessHandler)
	v.Get("/fail", handlers.FailHandler)
}

// function to mount poi routes
func PointsOfInterest(v fiber.Router) {
	v.Get("/pois", handlers.GetPointsOfInterest)
}
