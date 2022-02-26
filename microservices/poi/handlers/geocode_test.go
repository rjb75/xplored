package handlers

import (
	"os"
	"testing"

	"github.com/gofiber/fiber/v2/utils"
	"github.com/joho/godotenv"
	"github.com/rjb75/xplored-poi/logs"
	"github.com/rjb75/xplored-poi/models"
	"googlemaps.github.io/maps"
)

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
		Address: "2500 University Dr NW",
		Region:  "CA",
	}

	loc := latlon(&request, client)

	utils.AssertEqual(t, 51.0755455, loc.Lat, "Latitude")
	utils.AssertEqual(t, -114.129754, loc.Lng, "Longitude")
}
