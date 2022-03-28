package handlers

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
)

func PhotosHandler(c *fiber.Ctx) error {

	PhotoURI := fmt.Sprintf("http://%s:%s/photo/api/v1/photo", os.Getenv("GATEWAY_PHOTO_HOST"), os.Getenv("PHOTO_PORT"))

	params := c.Request().URI().QueryString()

	query, err := http.NewRequest("GET", PhotoURI, nil)

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

	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).Send(body)
	}

	return c.Status(200).Send(body)

}

func RandomPhotoHandler(c *fiber.Ctx) error {

	PhotoURI := fmt.Sprintf("http://%s:%s/photo/api/v1/random", os.Getenv("GATEWAY_PHOTO_HOST"), os.Getenv("PHOTO_PORT"))

	params := c.Request().URI().QueryString()

	query, err := http.NewRequest("GET", PhotoURI, nil)

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

	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).Send(body)
	}

	return c.Status(200).Send(body)

}
