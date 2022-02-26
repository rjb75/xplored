package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"

	//	"github.com/Risath18/xplored-dining/models"

	"github.com/joho/godotenv"
	"github.com/kr/pretty"
	_ "github.com/lib/pq"

	"googlemaps.github.io/maps"
)


func main() {
//	app := fiber.New()

	//Setting up Environment Variables
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	

	GetDiningOptions("6 Rue René Goscinny", "93000 Bobigny", "France", "10000", "Pasta")
	//Formatting port
	// SERVER_PORT := os.Getenv("DINING_PORT")
	// port := fmt.Sprintf(":%s", SERVER_PORT)
	// app.Listen(port)
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

	}
	result, err := c.NearbySearch(context.Background(), r)
	if err != nil {
		log.Fatalf("fatal error: %s", err)
	}

	return result
}

/*
* GetDiningOptions with Given Information
*/
func GetDiningOptions(street_address string, city string, country string, radius string, keyword string){
	//Format Address
	plusFormattedAddress := strings.ReplaceAll("+" + street_address, " ", "+")
	plusFormattedCity := strings.ReplaceAll("+" + city, " ", "+")
	plusFormattedCountry := strings.ReplaceAll("+" + country, " ", "+")

	//Format Keyword
	plusFormattedKeyword := strings.ReplaceAll("+" + keyword, " ", "+")

	//Combine Address
	address := fmt.Sprintf("%s+%s+%s", plusFormattedAddress, plusFormattedCity, plusFormattedCountry) 

	//Calculate Longitude & Latitude
	var lc maps.GeocodingResult = GeoCode(address)[0]
	//Get Dining Data
	var Result maps.PlacesSearchResponse = Places(lc, radius, plusFormattedKeyword)
	pretty.Println(Result)//Debugging Print Statement
}

