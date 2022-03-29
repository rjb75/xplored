package handlers

import (
	"context"
	"log"
	"os"
	"strconv"

	"github.com/Risath18/xplored-dining/models"
	"github.com/gofiber/fiber/v2"

	// "github.com/joho/godotenv"

	//"github.com/kr/pretty"
	_ "github.com/lib/pq"
	"googlemaps.github.io/maps"
)

/*
* Function associated with Endpoint to get Dining Data
 */
func GetDiningOptions(c *fiber.Ctx) error {
	req := new(models.DiningRequest)

	// data := diningOptions(c.Params("address"), c.Params("radius"), c.Params("keyword"))
	err := c.QueryParser(req)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Body Error", "cause": "Couldn't process body of request"})
	}

	// check that address isn't null
	if req.Address == "" {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Missing Paramater", "cause": "Address is required for points of interest"})
	}

	// check that radius isn't 0
	if req.Radius == "0" {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Missing Paramater", "cause": "Radius is required for points of interest"})
	}

	var data maps.PlacesSearchResponse

	//Calculate Longitude & Latitude
	var lc []maps.GeocodingResult = GeoCode(req.Address)
	if len(lc) > 0 {
		data = Places(lc[0], req.Radius, req.Keyword)
		// return Result
	} else {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Invalid request", "cause": "Invalid data"})
	}

	return c.Status(200).JSON(fiber.Map{"status": err, "data": data})
}

/*
* GeoCode API to determine Longitude and Latitude of given ADDRESS
* Returns a struct with Longitude and Latitude
 */
func GeoCode(address string) []maps.GeocodingResult {
	c, err := maps.NewClient(maps.WithAPIKey(os.Getenv("DINING_API")))
	if err != nil {
		log.Printf("fatal error: %s", err)
	}
	r := &maps.GeocodingRequest{
		Address: address,
	}
	result, err := c.Geocode(context.Background(), r)
	if err != nil {
		log.Printf("fatal error: %s", err)
	}

	return result
	//pretty.Println(result)
}

/*
* Places API to determine Dining Options in a fixed RADIUS, KEYWORD with given ADDRESS
* Returns a struct with information of restaurants and status
 */
func Places(lc maps.GeocodingResult, radius string, keyword string) maps.PlacesSearchResponse {
	c, err := maps.NewClient(maps.WithAPIKey(os.Getenv("DINING_API")))
	if err != nil {
		log.Printf("fatal error: %s", err)
	}

	loc := &maps.LatLng{
		Lat: lc.Geometry.Location.Lat,
		Lng: lc.Geometry.Location.Lng,
	}

	i, err := strconv.ParseUint(radius, 10, 64)
	if err != nil {
		log.Printf("fatal error: %s", err)
	}

	r := &maps.NearbySearchRequest{
		Location: loc,
		Radius:   uint(i),
		Keyword:  keyword,
		Type:     "restaurant",
	}
	result, err := c.NearbySearch(context.Background(), r)
	if err != nil {
		log.Printf("fatal error: %s", err)
	}

	return result
}

/*

 */
func GetDiningCoord(c *fiber.Ctx) error {
	req := new(models.Coordinates)

	// data := diningOptions(c.Params("address"), c.Params("radius"), c.Params("keyword"))
	err := c.QueryParser(req)

	println(req.Latitude)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Body Error", "cause": "Couldn't process body of request"})
	}

	// check that address isn't null
	if req.Radius == 0 {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Missing Paramater", "cause": "Radius is required for dining"})
	}

	//create google maps client
	client, err := maps.NewClient(maps.WithAPIKey(os.Getenv("DINING_API")))

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Environment", "cause": "Unable to create maps client"})
	}

	loc := new(maps.LatLng)
	loc.Lat = req.Latitude
	loc.Lng = req.Longitude

	//format request
	rq := &maps.NearbySearchRequest{
		Location: loc,
		Radius:   uint(req.Radius),
		Type:     maps.PlaceType(req.Keyword),
	}

	//execute search to API
	nearby, err := client.NearbySearch(context.Background(), rq)

	if err != nil {
		c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Nearby results", "cause": "Unable to identify nearby locations"})
	}

	return c.Status(200).JSON(nearby)

}
