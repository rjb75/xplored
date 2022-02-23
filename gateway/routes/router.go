package routes

import (
	"github.com/gofiber/fiber/v2"
)

func RegisterRoutes(app *fiber.App) {
	// Add frontend routes
	FrontendRoutes(app)

	// Non-authenticated routes here

	// TODO: add auth here

	// Authenticated routes go here
	FrontendProtectedRoutes(app)
}
