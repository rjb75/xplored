package handlers

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
)

func ShortTransportHandler(c *fiber.Ctx) error {

	TransportationURI := fmt.Sprintf("http://%s:%s/transportation/api/v1/short", os.Getenv("GATEWAY_TRANSPORTATION_HOST"), os.Getenv("TRANSPORTATION_PORT"))

	params := c.Request().URI().QueryString()

	query, err := http.NewRequest("GET", TransportationURI, nil)

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

func LongTransportHandler(c *fiber.Ctx) error {

	TransportationURI := fmt.Sprintf("http://%s:%s/transportation/api/v1/long", os.Getenv("GATEWAY_TRANSPORTATION_HOST"), os.Getenv("TRANSPORTATION_PORT"))

	params := c.Request().URI().QueryString()

	query, err := http.NewRequest("GET", TransportationURI, nil)

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

func AirportCodesHandler(c *fiber.Ctx) error {

	TransportationURI := fmt.Sprintf("http://%s:%s/transportation/api/v1/codes", os.Getenv("GATEWAY_TRANSPORTATION_HOST"), os.Getenv("TRANSPORTATION_PORT"))

	params := c.Request().URI().QueryString()

	query, err := http.NewRequest("GET", TransportationURI, nil)

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
