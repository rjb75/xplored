package handlers

import (
	"context"
	"os"

	// "strconv"

	"github.com/Risath18/xplored-transportation/models"
	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
	"googlemaps.github.io/maps"
)

func GetTransShort(c *fiber.Ctx) error {
	request := new(models.ShortRequest)
	err := c.QueryParser(request)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Body Error", "cause": "Couldn't process body of request"})
	}

	if (request.Origin == "" || request.Destination == ""){
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Missing Paramater"})
	}


	//check that data isn't null
	//if req.___ == null

	client, err := maps.NewClient(maps.WithAPIKey(os.Getenv("TRANSPORTATION_GOOGLE_API_KEY")))
	
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Failed to connect with API"})

	}

	r := &maps.DirectionsRequest {
		Origin : request.Origin,
		Destination : request.Destination,
		DepartureTime : request.DepartureTime,
	}

	result, waypoints, err := client.Directions(context.Background(), r)
	
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": err})
	}

	return c.Status(200).JSON(fiber.Map{"status": err, "data": result, "waypoint": waypoints})
}
