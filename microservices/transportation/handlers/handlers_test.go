package handlers_test

import (
	"io/ioutil"
	"net/http"
	"testing"

	"github.com/Risath18/xplored-transportation/handlers"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	// "github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/stretchr/testify/assert"
)

/*
	This test will test a valid short trip, originating in Italy,
	with a set of coordinates for a destination and departure time, as well
	as a mode of travel via transit. This test should return a JSON object that is
	not null.
*/
func TestValidShortTrip_Italy_Transit(t *testing.T) {

	// err := godotenv.Load("../../.env")

	// if err != nil {
	// 	assert.Fail(t, "Error loading .env file")
	// }

	app := fiber.New()
	app.Get("/", handlers.GetTransShort)

	req, err := http.NewRequest("GET", "/short?origin=Calle de la Misericordia, 585b, Venezia VE, Italy&destination=45.43635135011156, 12.335610844184384&departuretime=1648412412&mode=transit", nil)

	if err != nil {
		assert.Fail(t, "Error forming test request")
	}

	res, err := app.Test(req, -1)

	if err != nil {
		assert.Fail(t, "Error making test request")
	}

	body, err := ioutil.ReadAll(res.Body)

	if err != nil {
		assert.Fail(t, "Error parsing test response")
	}

	assert.NotNil(t, body, "Transportation short options should be returned")
	assert.NotEqual(t, "null", string(body), "Result should not be null")
}

// /*
// 	This test will test a valid short trip, originating in Calgary,
// 	with a set of coordinates for market mall and departure time, as well
// 	as a mode of travel via driving. This test should return a JSON object that is
// 	not null.
// */
// func TestValidShortTrip_Calgary_Mall(t *testing.T) {
// 	err := godotenv.Load("../../.env")

// 	if err != nil {
// 		assert.Fail(t, "Error loading .env file")
// 	}

// 	app := fiber.New()
// 	app.Get("/", handlers.GetTransShort)

// 	req, err := http.NewRequest("GET", "/short?origin=856 Campus Pl NW calgary alberta&destination=51.0845, 114.1554&departuretime=1648412412&mode=drive", nil)

// 	if err != nil {
// 		assert.Fail(t, "Error forming test request")
// 	}

// 	res, err := app.Test(req, -1)

// 	if err != nil {
// 		assert.Fail(t, "Error making test request")
// 	}

// 	body, err := ioutil.ReadAll(res.Body)

// 	if err != nil {
// 		assert.Fail(t, "Error parsing test response")
// 	}

// 	assert.NotNil(t, body, "Transportation short options should be returned")
// 	assert.NotEqual(t, "null", string(body), "Result should not be null")
// }

// /*
// 	This test will test a valid long trip, originating in Calgary, ending in Toronto,
// 	on May 23, 2022 for 1 passenger, sold in CAD.
// 	This test should return a JSON object that is not null.
// */
// func TestValidLongTrip_Calgary_Toronto(t *testing.T) {
// 	err := godotenv.Load("../../.env")

// 	if err != nil {
// 		assert.Fail(t, "Error loading .env file")
// 	}

// 	app := fiber.New()
// 	app.Get("/", handlers.GetTransShort)

// 	req, err := http.NewRequest("GET", "/long?origin=YYC&destination=yyz&departuredate=2022-06-23&adults=1&currency=CAD", nil)

// 	if err != nil {
// 		assert.Fail(t, "Error forming test request")
// 	}

// 	res, err := app.Test(req, -1)

// 	if err != nil {
// 		assert.Fail(t, "Error making test request")
// 	}

// 	body, err := ioutil.ReadAll(res.Body)

// 	if err != nil {
// 		assert.Fail(t, "Error parsing test response")
// 	}

// 	assert.NotNil(t, body, "Transportation long options should be returned")
// 	assert.NotEqual(t, "null", string(body), "Result should not be null")
// }

// /*
// 	This test will test a valid airport code for Calgary, which should be YYC.
// 	This test should return a JSON object that is not null.
// */
// func TestValidAirportCode(t *testing.T) {
// 	err := godotenv.Load("../../.env")

// 	if err != nil {
// 		assert.Fail(t, "Error loading .env file")
// 	}

// 	app := fiber.New()
// 	app.Get("/", handlers.GetAirportCode)

// 	req, err := http.NewRequest("GET", "/codes?name=calgary", nil)

// 	if err != nil {
// 		assert.Fail(t, "Error forming test request")
// 	}

// 	res, err := app.Test(req, -1)

// 	if err != nil {
// 		assert.Fail(t, "Error making test request")
// 	}

// 	body, err := ioutil.ReadAll(res.Body)

// 	if err != nil {
// 		assert.Fail(t, "Error parsing test response")
// 	}

// 	assert.NotNil(t, body, "Airport code should be returned")
// 	assert.NotEqual(t, "null", string(body), "Result should not be null")
// }

// /*
// 	This test will test a short trip, with a missing destination.
// 	This test should return a JSON object that is an error code stating
// 	that there was a missing parameter.
// */
// func TestInvalidShortTrip_MissingDestination(t *testing.T) {
// 	err := godotenv.Load("../../../.env")

// 	if err != nil {
// 		assert.Fail(t, "Error loading .env file")
// 	}

// 	app := fiber.New()
// 	app.Get("/", handlers.GetTransShort)

// 	req, err := http.NewRequest("GET", "/short?origin=856 Campus Pl NW calgary alberta&destination=&departuretime=1648412412&mode=drive", nil)

// 	if err != nil {
// 		assert.Fail(t, "Error forming test request")
// 	}

// 	res, err := app.Test(req, -1)

// 	if err != nil {
// 		assert.Fail(t, "Error making test request")
// 	}

// 	body, err := ioutil.ReadAll(res.Body)

// 	if err != nil {
// 		assert.Fail(t, "Error parsing test response")
// 	}

// 	assert.Equal(t, "null", string(body), "No dining options should have been returned")
// }

//invalid long trip

//invalid airport code
