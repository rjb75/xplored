package routes

import "github.com/gofiber/fiber/v2"

// routes that are acessible without authentication
func FrontendRoutes(app *fiber.App) {
	const frontendBuildPath = "../frontend/build"

	app.Static("/", frontendBuildPath)
}

// routes requiring the user to be authenticated
func FrontendProtectedRoutes(app *fiber.App) {
	// routes to be added
}
