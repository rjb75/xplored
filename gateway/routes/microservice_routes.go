package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rjb75/xplored-api-gateway/handlers"
)

// Routes for dining microservice
func DiningRoutes(r fiber.Router) {
	r.Get("/dining", handlers.DiningHandler)
}

// Routes for photo microservice
func PhotoRoutes(r fiber.Router) {
	r.Get("/photo", handlers.PhotosHandler)
}
