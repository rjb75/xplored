package handlers_test

import (
	"io/ioutil"
	"net/http"
	"testing"

	"github.com/Risath18/xplored-dining/handlers"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/stretchr/testify/assert"
)

func TestValidDiningOption_Vegan_5000(t *testing.T) {
	err := godotenv.Load("../../../.env")

	if err != nil {
		assert.Fail(t, "Error loading .env file")
	}

	app := fiber.New()
	app.Get("/", handlers.GetDiningOptions)

	req, err := http.NewRequest("GET", "/?address=856 Campus Pl NW calgary alberta&keyword=vegan&radius=5000", nil)

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

	assert.NotNil(t, body, "Dining options should be returned")
	assert.NotEqual(t, "null", string(body), "Result should not be null")

}

func TestValidDiningOption_Mexican_10000(t *testing.T) {
	err := godotenv.Load("../../../.env")

	if err != nil {
		assert.Fail(t, "Error loading .env file")
	}

	app := fiber.New()
	app.Get("/", handlers.GetDiningOptions)

	req, err := http.NewRequest("GET", "/?address=856 Campus Pl NW calgary alberta&keyword=mexican&radius=10000", nil)

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

	assert.NotNil(t, body, "Dining options should be returned")
	assert.NotEqual(t, "null", string(body), "Result should not be null")

}

func TestValidDiningOption_NewYork_Pizza(t *testing.T) {
	err := godotenv.Load("../../../.env")

	if err != nil {
		assert.Fail(t, "Error loading .env file")
	}

	app := fiber.New()
	app.Get("/", handlers.GetDiningOptions)

	req, err := http.NewRequest("GET", "/?address=20 W 34th St, New York, NY 10001, United States&keyword=vegan&radius=10000", nil)

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

	assert.NotNil(t, body, "Dining options should be returned")
	assert.NotEqual(t, "null", string(body), "Result should not be null")

}

func TestInvalidDiningOption_MissingAddress(t *testing.T) {
	err := godotenv.Load("../../../.env")

	if err != nil {
		assert.Fail(t, "Error loading .env file")
	}

	app := fiber.New()
	app.Get("/", handlers.GetDiningOptions)

	req, err := http.NewRequest("GET", "/?address=&keyword=vegetable&radius=5000", nil)

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

	assert.Equal(t, "{\"cause\":\"Address is required for points of interest\",\"status\":\"fail\",\"type\":\"Missing Paramater\"}", string(body), "No dining options should have been returned")
}

func TestInvalidDiningOption_InvalidAddress(t *testing.T) {
	err := godotenv.Load("../../../.env")

	if err != nil {
		assert.Fail(t, "Error loading .env file")
	}

	app := fiber.New()
	app.Get("/", handlers.GetDiningOptions)

	req, err := http.NewRequest("GET", "/?address=123 Sesame Street&keyword=vegan&radius=5000", nil)

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

	assert.Equal(t, "{\"cause\":\"Invalid data\",\"status\":\"fail\",\"type\":\"Invalid request\"}", string(body), "No dining options should have been returned")
}

func TestInvalidDiningOption_ZeroRadius(t *testing.T) {
	err := godotenv.Load("../../../.env")

	if err != nil {
		assert.Fail(t, "Error loading .env file")
	}

	app := fiber.New()
	app.Get("/", handlers.GetDiningOptions)

	req, err := http.NewRequest("GET", "/?address=20 W 34th St, New York, NY 10001, United States&keyword=burgers&radius=0", nil)

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

	assert.Equal(t, "{\"cause\":\"Radius is required for points of interest\",\"status\":\"fail\",\"type\":\"Missing Paramater\"}", string(body), "No dining options should have been returned")
}
