package handlers_test

import (
	"os"
	"testing"

	"github.com/gofiber/fiber/v2/utils"
	"github.com/joho/godotenv"
	"github.com/rjb75/xplored-poi/handlers"
	"github.com/rjb75/xplored-poi/logs"
	"github.com/rjb75/xplored-poi/models"
	"googlemaps.github.io/maps"
)

/*
	This test will test a POI with the latitude and longitude of U of C.
	This test should return the correct latitude and longitude of the location.
*/
func Test_latlon_UofC(t *testing.T) {

	logs.TestLogs()

	err := godotenv.Load("../../../.env")

	if err != nil {
		logs.ErrorLogger.Fatalln("Couldn't load environment file")
	}

	client, err := maps.NewClient(maps.WithAPIKey(os.Getenv("POI_GOOGLE_API_KEY")))

	if err != nil {
		logs.ErrorLogger.Fatalln("Error connecting with api")
	}

	request := models.POIRequest{
		Address: "2500 University Dr NW Calgary",
	}

	loc := handlers.Latlon(&request, client)

	utils.AssertEqual(t, 51.0755455, loc.Lat, "Latitude")
	utils.AssertEqual(t, -114.1297544, loc.Lng, "Longitude")
}

/*
	This test will test a POI with the latitude and longitude of an invalid location.
	This test should return the latitude and longitude as 0.0.
*/
func Test_latlon_Invalid(t *testing.T) {

	logs.TestLogs()

	err := godotenv.Load("../../../.env")

	if err != nil {
		logs.ErrorLogger.Fatalln("Couldn't load environment file")
	}

	client, err := maps.NewClient(maps.WithAPIKey(os.Getenv("POI_GOOGLE_API_KEY")))

	if err != nil {
		logs.ErrorLogger.Fatalln("Error connecting with api")
	}

	request := models.POIRequest{
		Address: "123 Sesame Street",
	}

	loc := handlers.Latlon(&request, client)

	utils.AssertEqual(t, 0.0, loc.Lat, "Lat should be 0.0")
	utils.AssertEqual(t, 0.0, loc.Lng, "Lng should be 0.0")
}
