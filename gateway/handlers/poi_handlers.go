package handlers

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
)

// handler for getting reviews by tag
func POIsHandler(c *fiber.Ctx) error {

	POIsURI := fmt.Sprintf("http://%s:%s/poi/api/v1/pois", os.Getenv("GATEWAY_POI_HOST"), os.Getenv("POI_PORT"))

	params := c.Request().URI().QueryString()

	query, err := http.NewRequest("GET", POIsURI, nil)

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
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't parse response", "origin": "gateway"})
	}

	return c.Status(200).Send(body)
}

// handler for getting reviews by tag
func POIsLatLngHandler(c *fiber.Ctx) error {

	POIsURI := fmt.Sprintf("http://%s:%s/poi/api/v1/pois/latlng", os.Getenv("GATEWAY_POI_HOST"), os.Getenv("POI_PORT"))

	params := c.Request().URI().QueryString()

	query, err := http.NewRequest("GET", POIsURI, nil)

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
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't parse response", "origin": "gateway"})
	}

	return c.Status(200).Send(body)
}
