package handlers

import (
	"net/http/httptest"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/utils"
)

func TestSuccessHandler(t *testing.T) {
	app := fiber.New()

	app.Get("/test", SuccessHandler)

	resp, err := app.Test(httptest.NewRequest("GET", "/test", nil))

	utils.AssertEqual(t, nil, err, "Error")
	utils.AssertEqual(t, 200, resp.StatusCode, "Status code")
}

func TestFailHandler(t *testing.T) {
	app := fiber.New()

	app.Get("/test", FailHandler)

	resp, err := app.Test(httptest.NewRequest("GET", "/test", nil))

	utils.AssertEqual(t, nil, err, "Error")
	utils.AssertEqual(t, 500, resp.StatusCode, "Status code")
}
