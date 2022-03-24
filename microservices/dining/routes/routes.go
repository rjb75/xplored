package routes

import (
	//	"fmt"

	"github.com/Risath18/xplored-dining/handlers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func RegisterRoutes(app *fiber.App) {
	app.Use(cors.New())

	//Api Version Configuration
	microservice := app.Group("/dining") // /api
	api := microservice.Group("/api")    // /api
	v1 := api.Group("/v1")               // /api/v1
	v1.Get("/", handlers.GetDiningOptions)
	// diningRoutes(v1)
}

// func diningRoutes(v fiber.Router) {
// 	v.Get("/dining", handlers.GetDiningOptions)
// }
