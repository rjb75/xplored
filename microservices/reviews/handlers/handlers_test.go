package handlers_test

import (
	"io/ioutil"
	"net/http"
	"testing"

	"github.com/alexishamrak/xplored-reviews/handlers"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/stretchr/testify/assert"
)

func TestAllReviews(t *testing.T) {
	err := godotenv.Load("../../../.env")

	if err != nil {
		assert.Fail(t, "Error loading .env file")
	}

	handlers.DBConnect()

	app := fiber.New()
	app.Get("/", handlers.AllReviews)

	req, err := http.NewRequest("GET", "localhost:8000/", nil)

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

	assert.NotNil(t, body, "Reviews should be returned")

}

func TestValidTagReviews(t *testing.T) {
	err := godotenv.Load("../../../.env")

	if err != nil {
		assert.Fail(t, "Error loading .env file")
	}

	handlers.DBConnect()

	app := fiber.New()
	app.Get("/", handlers.SearchTag)

	req, err := http.NewRequest("GET", "/?tags=paris", nil)

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

	assert.NotNil(t, body, "Reviews should be returned")
	assert.NotEqual(t, "null", string(body), "Result should not be null")

}

func TestInvalidTagReviews(t *testing.T) {
	err := godotenv.Load("../../../.env")

	if err != nil {
		assert.Fail(t, "Error loading .env file")
	}

	handlers.DBConnect()

	app := fiber.New()
	app.Get("/", handlers.SearchTag)

	req, err := http.NewRequest("GET", "/?tags=horseing", nil)

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

	assert.Equal(t, string(body), "null", "No reviews should have been returned")
}
