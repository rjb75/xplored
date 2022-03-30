package handlers

import (
	"context"
	"encoding/csv"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/Risath18/xplored-transportation/models"
	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
	"googlemaps.github.io/maps"
)

//Import All Codes
var Codes map[string]models.AirportCodes

// helper function to initalize airport codes
func InitAirportCodes() {
	Codes = ImportAirportCodes()
}

/*
* Helper Method to Import codes from CSV
 */
func ImportAirportCodes() map[string]models.AirportCodes {

	// err := godotenv.Load("../../.env")
	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }

	f, err := os.Open(os.Getenv("TRANSPORTATION_AIRPORT_CODE_CSV"))
	if err != nil {
		log.Fatal(err)
	}

	// remember to close the file at the end of the program
	defer f.Close()

	// read csv values using csv.Reader
	csvReader := csv.NewReader(f)
	data, err := csvReader.ReadAll()
	if err != nil {
		log.Fatal(err)
	}

	// convert records to array of structs
	codesMap := make(map[string]models.AirportCodes)
	for i, line := range data {
		if i > 0 { // omit header line
			var rec models.AirportCodes
			var key string
			for j, field := range line {
				if j == 0 {
					key = field
					rec.Name = field
				} else if j == 1 {
					rec.Municipality = field
				} else if j == 2 {
					rec.Code = field
				} else if j == 3 {
					rec.Coordinates = field
				}
				codesMap[key] = rec
			}
		}
	}
	return codesMap
}

/*
* Dynamic Query to get Airport Codes based on various data
 */
func GetAirportCode(c *fiber.Ctx) error {
	request := new(models.CodeRequest)
	err := c.QueryParser(request)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Body Error", "cause": "Couldn't process body of request"})
	}

	if request.Name == "" {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Missing Paramater"})
	}

	//Look for Names
	tempMap := make(map[string]models.AirportCodes)
	for k := range Codes {
		if strings.HasPrefix(strings.ToLower(k), strings.ToLower(request.Name)) {
			tempMap[k] = Codes[k]
		}
	}

	//Look for City
	for k := range Codes {
		if strings.HasPrefix(strings.ToLower(Codes[k].Municipality), strings.ToLower(request.Name)) {
			tempMap[k] = Codes[k]
		}
	}

	//Look for Code
	for k := range Codes {
		if strings.HasPrefix(strings.ToLower(Codes[k].Code), strings.ToLower(request.Name)) {
			tempMap[k] = Codes[k]
		}
	}

	//If prefix contains less than 5, look for inside string.
	if len(tempMap) < 5 {
		for k := range Codes {
			if strings.Contains(strings.ToLower(k), strings.ToLower(request.Name)) {
				if _, ok := tempMap[k]; !ok {
					tempMap[k] = Codes[k]
				}
			}
		}
	}

	if len(tempMap) == 0 {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Invalid data"})
	}

	return c.Status(200).JSON(fiber.Map{"status": "Success", "data": tempMap})
}

/*
* Short Distance travel with Google API
 */
func GetTransShort(c *fiber.Ctx) error {
	request := new(models.ShortRequest)
	err := c.QueryParser(request)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Body Error", "cause": "Couldn't process body of request"})
	}

	if request.Origin == "" || request.Destination == "" {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Missing Paramater"})
	}

	client, err := maps.NewClient(maps.WithAPIKey(os.Getenv("TRANSPORTATION_GOOGLE_API_KEY")))

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Failed to connect with API"})

	}

	r := &maps.DirectionsRequest{
		Origin:        request.Origin,
		Destination:   request.Destination,
		DepartureTime: request.DepartureTime,
		ArrivalTime:   request.ArrivalTime,
		Mode:          request.Mode,
	}

	result, waypoints, err := client.Directions(context.Background(), r)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": err})
	}

	return c.Status(200).JSON(fiber.Map{"status": err, "data": result, "waypoint": waypoints})
}

/*
* Flight information with Flights API
 */
func GetTransLong(c *fiber.Ctx) error {
	request := new(models.LongRequest)
	err := c.QueryParser(request)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Body Error", "cause": "Couldn't process body of request"})
	}

	if request.Origin == "" || request.Destination == "" || request.DepartureDate == "" || request.Adults == "" {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Missing Paramater"})
	}

	url := os.Getenv("TRANSPORTATION_FLIGHT_API_URI") + "?"

	if request.Origin != "" {
		url = url + "&origin=" + request.Origin
	}

	if request.Destination != "" {
		url = url + "&destination=" + request.Destination
	}

	if request.DepartureDate != "" {
		url = url + "&departureDate=" + request.DepartureDate
	}

	if request.Adults != "" {
		url = url + "&adults=" + request.Adults
	}

	if request.Currency != "" {
		url = url + "&currency=" + request.Currency
	}

	if request.ReturnDate != "" {
		url = url + "&returnDate=" + request.ReturnDate
	}

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("X-RapidAPI-Host", os.Getenv("TRANSPORTATION_FLIGHT_API_HOST"))
	req.Header.Add("X-RapidAPI-Key", os.Getenv("TRANSPORTATION_FLIGHT_API_KEY"))

	res, err := http.DefaultClient.Do(req)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Body Error", "cause": "Couldn't make request to api"})
	}

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	//JSONIFY
	var jsonMap map[string]interface{}
	json.Unmarshal([]byte(string(body)), &jsonMap)

	return c.Status(200).JSON(fiber.Map{"status": err, "data": jsonMap})

}


/*
* Short Distance travel with Google API
 */
 func GetAllModes(c *fiber.Ctx) error {
	request := new(models.AllShortRequest)
	err := c.QueryParser(request)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Body Error", "cause": "Couldn't process body of request"})
	}

	if request.Origin == "" || request.Destination == "" {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Missing Paramater"})
	}

	client, err := maps.NewClient(maps.WithAPIKey(os.Getenv("TRANSPORTATION_GOOGLE_API_KEY")))

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Failed to connect with API"})

	}

	var modes[4] maps.Mode
	modes[0] = "driving"
	modes[1] = "bicycling"
	modes[2] = "transit"
	modes[3] = "walking"

	var results[4][] maps.Route
	var waypoints[4][] maps.GeocodedWaypoint

	//Driving
	r := &maps.DirectionsRequest{
		Origin:        request.Origin,
		Destination:   request.Destination,
		DepartureTime: request.DepartureTime,
		ArrivalTime:   request.ArrivalTime,
		Mode:          modes[0],
	}

	tempResultOne, tempWaypointOne, errOne := client.Directions(context.Background(), r)
	if errOne == nil {
		results[0] = tempResultOne
		waypoints[0] = tempWaypointOne
	}

	//Bicycling
	r = &maps.DirectionsRequest{
		Origin:        request.Origin,
		Destination:   request.Destination,
		DepartureTime: request.DepartureTime,
		ArrivalTime:   request.ArrivalTime,
		Mode:          modes[1],
	}

	tempResultTwo, tempWaypointTwo, errTwo := client.Directions(context.Background(), r)
	if errTwo == nil {
		results[1] = tempResultTwo
		waypoints[1] = tempWaypointTwo
	}

	//transit
	r = &maps.DirectionsRequest{
		Origin:        request.Origin,
		Destination:   request.Destination,
		DepartureTime: request.DepartureTime,
		ArrivalTime:   request.ArrivalTime,
		Mode:          modes[2],
	}

	tempResultThree, tempWaypointThree, errThree := client.Directions(context.Background(), r)
	if errThree == nil {
		results[2] = tempResultThree
		waypoints[2] = tempWaypointThree
	}

	//walking
	r = &maps.DirectionsRequest{
		Origin:        request.Origin,
		Destination:   request.Destination,
		DepartureTime: request.DepartureTime,
		ArrivalTime:   request.ArrivalTime,
		Mode:          modes[3],
	}

	tempResultFour, tempWaypointFour, errFour := client.Directions(context.Background(), r)
	if errFour == nil {
		results[3] = tempResultFour
		waypoints[3] = tempWaypointFour
	}

	//May not do anything
	if len(results) == 0 {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": err})
	}

	return c.Status(200).JSON(fiber.Map{"status": err, "data": results, "waypoint": waypoints})
}