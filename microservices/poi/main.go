package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/rjb75/xplored-poi/routes"
)

func main() {
	app := fiber.New()

	routes.RegisterRoutes(app)

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	port := fmt.Sprintf(":%d", 8181)

	app.Listen(port)
}
