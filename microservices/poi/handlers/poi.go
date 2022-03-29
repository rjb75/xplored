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
// @Title Get Points of Interest
// @Description Given an address, keyword(s) and a radius return nearby points of interes
// @Param address query string true "Address to search from"
// @Param keyword query string true "Keyword of the point of interest"
// @Param radius query int true "Radius to search from address"
// @Router /poi [get]
func GetPointsOfInterest(c *fiber.Ctx) error {

	// create new request structure
	req := new(models.POIRequest)

	err := c.QueryParser(req)

	if err != nil {
		logs.ErrorLogger.Println("Couldn't parse body of request")
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Body Error", "cause": "Couldn't process body of request"})
	}

	// check that address isn't null
	if req.Address == "" {
		logs.ErrorLogger.Printf("Invalid or malformed address: %s\n", req.Address)
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Missing Paramater", "cause": "Address is required for points of interest"})
	}

	// check that radius isn't 0
	if req.Radius == 0 {
		logs.ErrorLogger.Printf("Invalid or malformed radius")
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Missing Paramater", "cause": "Radius is required for points of interest"})
	}

	// create google maps client
	client, err := maps.NewClient(maps.WithAPIKey(os.Getenv("POI_GOOGLE_API_KEY")))

	if err != nil {
		logs.ErrorLogger.Println("Unable to create google maps client")
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Environment", "cause": "Unable to create maps client"})
	}

	// get latitude and longitude
	loc := Latlon(req, client)

	if loc.Lat == 0.0 && loc.Lng == 0.0 {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Invalid Address", "cause": "Address either doesn't exist or is invalid"})
	}

	// format request
	rq := &maps.NearbySearchRequest{
		Location: &loc,
		Radius:   uint(req.Radius),
		Type:     maps.PlaceType(req.Keyword),
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
