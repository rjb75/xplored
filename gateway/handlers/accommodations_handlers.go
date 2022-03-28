package handlers

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
)

func AccommodationHandler(c *fiber.Ctx) error {

	AccommodationURI := fmt.Sprintf("http://%s:%s/accom/api/v1/", os.Getenv("GATEWAY_ACCOMMODATION_HOST"), os.Getenv("ACCOMMODATION_PORT"))

	params := c.Request().URI().QueryString()

	query, err := http.NewRequest("GET", AccommodationURI, nil)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't form request", "origin": "gateway", "reason": err.Error()})
	}

	query.URL.RawQuery = string(params)

	client := &http.Client{}

	resp, err := client.Do(query)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't make request", "origin": "gateway", "reason": err.Error()})
	}

	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't parse response", "origin": "gateway", "reason": err.Error()})
	}

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't send parsed response", "origin": "gateway", "reason": err.Error()})
	}

	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).Send(body)
	}

	return c.Status(200).Send(body)

}
