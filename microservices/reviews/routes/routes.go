package routes

import (
	//	"fmt"
	"strings"

	"github.com/alexishamrak/xplored-reviews/handlers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/kr/pretty"
)

func RegisterRoutes(app *fiber.App) {
	app.Use(cors.New())

	//Api Version Configuration
	microservice := app.Group("/reviews") // /api
	api := microservice.Group("/api")
	v1 := api.Group("/v1")
	// v1.Get("/tags", handlers.SearchTag)

	reviewsRoutes(v1)
}

func reviewsRoutes(v fiber.Router) {
	println("inside reviews routes")
	v.Get("/:tags", GetReviewsOptions)
}

/*
* Function associated with Endpoint to get Reviews Data
 */
func GetReviewsOptions(c *fiber.Ctx) error {
	println("Inside get reviews options")
	data := reviewsOptions(c, c.Params("tags"))

	errorStatus := "Success"

	if len(data.Error()) <= 0 {
		errorStatus = "Error"
	}

	return c.Status(200).JSON(fiber.Map{"status": errorStatus, "data": data})
}

/*
* reviewsOptions with Given Information
 */
func reviewsOptions(c *fiber.Ctx, tags string) error {
	//Format Address
	plusFormattedTags := strings.ReplaceAll("+"+tags, " ", "+")
	println("inside reviews options")
	//Get Reviews Data
	Result := handlers.SearchTag(c, plusFormattedTags)
	pretty.Println("The result is %s", Result) //Debugging Print Statement
	return Result
}
