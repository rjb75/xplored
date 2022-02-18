package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rjb75/xplored-poi/handlers"
)

// function to register routes to application
func RegisterRoutes(app *fiber.App) {
	api := app.Group("/api")
	test := api.Group("/test")

	TestRoutes(test)
}

// function to mount test routes
func TestRoutes(v fiber.Router) {
	v.Get("/success", handlers.SuccessHandler)
	v.Get("/fail", handlers.FailHandler)
}
