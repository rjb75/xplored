package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"

	//"github.com/kr/pretty"
	_ "github.com/lib/pq"
	"googlemaps.github.io/maps"
)


func main() {
	app := fiber.New()

	//Setting up Environment Variables
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	//Configure all Routes
	RegisterRoutes(app)

	//Formatting port
	SERVER_PORT := os.Getenv("DINING_PORT")
	port := fmt.Sprintf(":%s", SERVER_PORT)
	app.Listen(port)
}


/*
* Function associated with Endpoint to get Dining Data
*/
func GetDiningOptions(c *fiber.Ctx) error {

	data := diningOptions(c.Params("address"), c.Params("radius"), c.Params("keyword"))
	errorStatus := "Success"

	if len(data.Results) <= 0 {
		errorStatus = "Error"
	}

	return c.Status(200).JSON(fiber.Map{"status": errorStatus, "data": data})
}


/*
* GeoCode API to determine Longitude and Latitude of given ADDRESS
* Returns a struct with Longitude and Latitude
*/
func GeoCode(address string) []maps.GeocodingResult{
	c, err := maps.NewClient(maps.WithAPIKey(os.Getenv("DINING_API")))
	if err != nil {
		log.Fatalf("fatal error: %s", err)
	}
	r := &maps.GeocodingRequest {
		Address :  address,
	}
	result, err := c.Geocode(context.Background(), r)
	if err != nil {
		log.Fatalf("fatal error: %s", err)
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
		log.Fatalf("fatal error: %s", err)
	}

	loc := &maps.LatLng {
		Lat : lc.Geometry.Location.Lat,
		Lng : lc.Geometry.Location.Lng,
	}


	i, err := strconv.ParseUint(radius, 10, 64)
	if err != nil {
		log.Fatalf("fatal error: %s", err)
	}

	r := &maps.NearbySearchRequest {
		Location  :  loc,
		Radius : uint(i),
		Keyword : keyword,
		Type  : "restaurant",

	}
	result, err := c.NearbySearch(context.Background(), r)
	if err != nil {
		log.Fatalf("fatal error: %s", err)
	}

	return result
}

/*
* diningOptions with Given Information
*/
func diningOptions(street_address string, radius string, keyword string) maps.PlacesSearchResponse{
	//Format Address
	plusFormattedAddress := strings.ReplaceAll("+" + street_address, " ", "+")

	//Format Keyword
	plusFormattedKeyword := strings.ReplaceAll("+" + keyword, " ", "+")

	//Calculate Longitude & Latitude
	var lc maps.GeocodingResult = GeoCode(plusFormattedAddress)[0]
	//Get Dining Data
	Result := Places(lc, radius, plusFormattedKeyword)
//	pretty.Println(Result)//Debugging Print Statement
	return Result
}

