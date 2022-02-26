package handlers

import (
	"context"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/rjb75/xplored-poi/logs"
	"github.com/rjb75/xplored-poi/models"
	"googlemaps.github.io/maps"
)

// endpoint to get points of interest by address
func GetPointsOfInterest(c *fiber.Ctx) error {

	// create new request structure
	req := new(models.POIRequest)

	err := c.BodyParser(req)

	if err != nil {
		logs.ErrorLogger.Println("Couldn't parse body of request")
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Body Error", "cause": "Couldn't process body of request"})
	}

	// check that address isn't null
	if req.Address == "" {
		logs.ErrorLogger.Printf("Invalid or malformed address: %s\n", req.Address)
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Missing Paramater", "cause": "Address is required for points of interest"})
	}

	// create google maps client
	client, err := maps.NewClient(maps.WithAPIKey(os.Getenv("POI_GOOGLE_API_KEY")))

	if err != nil {
		logs.ErrorLogger.Println("Unable to create google maps client")
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Environment", "cause": "Unable to create maps client"})
	}

	// get latitude and longitude
	loc := latlon(req, client)

	// format request
	rq := &maps.NearbySearchRequest{
		Location: &loc,
		Radius:   1000,
		Type:     maps.PlaceType(req.Type),
	}

	// execute search to nearby api
	nearby, err := client.NearbySearch(context.Background(), rq)

	if err != nil {
		logs.ErrorLogger.Println("Error geocoding")
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Nearby Results", "cause": "Unable to identify nearby locations"})
	}

	// return results
	return c.Status(200).JSON(nearby)
}
