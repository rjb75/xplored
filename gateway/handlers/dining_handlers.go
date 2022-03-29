package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
)

// temporary location of dining URI, will move to .env
const DiningURI = "http://127.0.0.1:3002/dining/api/v1/"

// handler for dining microservice
func DiningHandler(c *fiber.Ctx) error {

	DiningURI := fmt.Sprintf("http://%s:%s/dining/api/v1/", os.Getenv("GATEWAY_DINING_HOST"), os.Getenv("DINING_PORT"))

	params := c.Request().URI().QueryString()

	query, err := http.NewRequest("GET", DiningURI, nil)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't make request", "origin": "gateway", "reason": err.Error()})
	}

	query.URL.RawQuery = string(params)

	client := &http.Client{}

	resp, err := client.Do(query)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't parse response", "origin": "gateway"})
	}

	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't read response", "origin": "gateway"})
	}

	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).Send(body)
	}

	var body_resp map[string]interface{}

	err = json.Unmarshal(body, &body_resp)

	res, err := json.Marshal(body_resp["data"].(map[string]interface{}))

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't parse response", "origin": "gateway"})
	}

	return c.Status(200).Send(res)
}

// handler for dining microservice
func DiningLatLngHandler(c *fiber.Ctx) error {

	DiningURI := fmt.Sprintf("http://%s:%s/dining/api/v1/latlng", os.Getenv("GATEWAY_DINING_HOST"), os.Getenv("DINING_PORT"))

	params := c.Request().URI().QueryString()

	query, err := http.NewRequest("GET", DiningURI, nil)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't make request", "origin": "gateway", "reason": err.Error()})
	}

	query.URL.RawQuery = string(params)

	client := &http.Client{}

	resp, err := client.Do(query)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't parse response", "origin": "gateway"})
	}

	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't read response", "origin": "gateway"})
	}

	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).Send(body)
	}

	return c.Status(200).Send(body)
}
