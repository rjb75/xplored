package main

import (
	//	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func RegisterRoutes(app *fiber.App) {
	app.Use(cors.New())

	//Api Version Configuration
	microservice := app.Group("/dining") // /api
	api := microservice.Group("/api") // /api
	v1 := api.Group("/v1")   // /api/v1

	diningOptions(v1)
}

func diningOptions(v fiber.Router) {
	v.Get("/:address/:keyword/:radius", GetDiningOptions)
}
