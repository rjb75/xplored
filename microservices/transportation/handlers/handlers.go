package handlers

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"os"

	// "strconv"

	"github.com/Risath18/xplored-transportation/models"
	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
	"googlemaps.github.io/maps"
)

/*
* Short Distance travel with Google API
 */
func GetTransShort(c *fiber.Ctx) error {
	request := new(models.ShortRequest)
	err := c.QueryParser(request)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Body Error", "cause": "Couldn't process body of request"})
	}

	if (request.Origin == "" || request.Destination == ""){
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Missing Paramater"})
	}

	client, err := maps.NewClient(maps.WithAPIKey(os.Getenv("TRANSPORTATION_GOOGLE_API_KEY")))
	
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Failed to connect with API"})

	}

	r := &maps.DirectionsRequest {
		Origin : request.Origin,
		Destination : request.Destination,
		DepartureTime : request.DepartureTime,
		ArrivalTime : request.ArrivalTime,
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

	if (request.Origin == "" || request.Destination == "" || request.DepartureDate == ""  || request.Adults == ""){
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Missing Paramater"})
	}

	url := os.Getenv("TRANSPORTATION_FLIGHT_API_URI") + "?";

	if(request.Origin != ""){
		url = url + "&origin=" + request.Origin
	}

	if(request.Destination != ""){
		url = url + "&destination=" + request.Destination
	}

	if(request.DepartureDate != ""){
		url = url + "&departureDate=" + request.DepartureDate
	}

	if(request.Adults != ""){
		url = url + "&adults=" + request.Adults
	}

	if(request.Currency != ""){
		url = url + "&currency=" + request.Currency
	}


	if(request.ReturnDate != ""){
		url = url + "&returnDate=" + request.ReturnDate
	}

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("X-RapidAPI-Host",  os.Getenv("TRANSPORTATION_FLIGHT_API_HOST"))
	req.Header.Add("X-RapidAPI-Key", os.Getenv("TRANSPORTATION_FLIGHT_API_KEY"))

	res, err := http.DefaultClient.Do(req)

	
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Body Error", "cause": "Couldn't make request to api"})
	}


	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	//JSONIFY
	var jsonMap map[string]interface{}
	json.Unmarshal([]byte(string(body) ), &jsonMap)	

	return c.Status(200).JSON(fiber.Map{"status": err, "data": jsonMap})

}