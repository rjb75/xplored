package handlers_test

import (
	"io/ioutil"
	"net/http"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/rjb75/xplored-poi/handlers"
	"github.com/rjb75/xplored-poi/logs"
	"github.com/stretchr/testify/assert"
)

func TestValidPOI_University_Cafe(t *testing.T) {
	logs.TestLogs()

	err := godotenv.Load("../../../.env")

	if err != nil {
		logs.ErrorLogger.Fatalln("Couldn't load environment file")
	}
	// err := godotenv.Load("../../../.env")

	if err != nil {
		assert.Fail(t, "Error loading .env file")
	}

	app := fiber.New()
	app.Get("/", handlers.GetPointsOfInterest)

	req, err := http.NewRequest("GET", "/?location=2500 University Dr NW, Calgary, AB T2N 1N4&type=cafe&distance=5000", nil)

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

	assert.NotNil(t, body, "POI options should be returned")
	assert.NotEqual(t, "null", string(body), "Result should not be null")

}

func TestValidPOI_Florida_ThemePark(t *testing.T) {
	logs.TestLogs()

	err := godotenv.Load("../../../.env")

	if err != nil {
		logs.ErrorLogger.Fatalln("Couldn't load environment file")
	}

	if err != nil {
		assert.Fail(t, "Error loading .env file")
	}

	app := fiber.New()
	app.Get("/", handlers.GetPointsOfInterest)

	req, err := http.NewRequest("GET", "/?location=3208 John Young Pkwy, Kissimmee, FL 34741, United States&type=theme park&distance=20000", nil)

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

	assert.NotNil(t, body, "POI options should be returned")
	assert.NotEqual(t, "null", string(body), "Result should not be null")

}

func TestValidPOI_Paris_Blank(t *testing.T) {
	logs.TestLogs()

	err := godotenv.Load("../../../.env")

	if err != nil {
		logs.ErrorLogger.Fatalln("Couldn't load environment file")
	}
	// err := godotenv.Load("../../../.env")

	if err != nil {
		assert.Fail(t, "Error loading .env file")
	}

	app := fiber.New()
	app.Get("/", handlers.GetPointsOfInterest)

	req, err := http.NewRequest("GET", "/?location=paris&type=&distance=20000", nil)

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

	assert.NotNil(t, body, "POI options should be returned")
	assert.NotEqual(t, "null", string(body), "Result should not be null")

}

func TestInvalidPOI_Address(t *testing.T) {
	logs.TestLogs()
	err := godotenv.Load("../../../.env")

	if err != nil {
		assert.Fail(t, "Error loading .env file")
	}

	app := fiber.New()
	app.Get("/", handlers.GetPointsOfInterest)

	req, err := http.NewRequest("GET", "/?address=Kanananaskakis&keyword=&radius=", nil)

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

	assert.Equal(t, "{\"cause\":\"Radius is required for points of interest\",\"status\":\"fail\",\"type\":\"Missing Paramater\"}", string(body), "No POI should have been returned")
}

func TestInvalidPOI_NullAddress(t *testing.T) {
	logs.TestLogs()
	err := godotenv.Load("../../../.env")

	if err != nil {
		assert.Fail(t, "Error loading .env file")
	}

	app := fiber.New()
	app.Get("/", handlers.GetPointsOfInterest)

	req, err := http.NewRequest("GET", "/?address=&keyword=cafe&radius=5000", nil)

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

	assert.Equal(t, "{\"cause\":\"Address is required for points of interest\",\"status\":\"fail\",\"type\":\"Missing Paramater\"}", string(body), "No POI should have been returned")
}

func TestInvalidPOI_ZeroRadius(t *testing.T) {
	logs.TestLogs()
	err := godotenv.Load("../../../.env")

	if err != nil {
		assert.Fail(t, "Error loading .env file")
	}

	app := fiber.New()
	app.Get("/", handlers.GetPointsOfInterest)

	req, err := http.NewRequest("GET", "/?address=2500 University Dr NW, Calgary, AB T2N 1N4&keyword=cafe&radius=0", nil)

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

	assert.Equal(t, "{\"cause\":\"Radius is required for points of interest\",\"status\":\"fail\",\"type\":\"Missing Paramater\"}", string(body), "No POI should have been returned")
}
