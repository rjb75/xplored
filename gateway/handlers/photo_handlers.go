package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/rjb75/xplored-api-gateway/models"
)

const PhotoURI = "http://localhost:3006/photo/api/v1/"

func PhotosHandler(c *fiber.Ctx) error {
	req := new(models.PhotoRequest)

	err := c.QueryParser(req)

	if len(req.Name) == 0 {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Request Error", "cause": "Missing request properties", "origin": "gateway"})
	}

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Request Error", "cause": "Unable to parse malformed request", "origin": "gateway"})
	}

	resp, err := http.Get(fmt.Sprintf("%s%s", PhotoURI, req.Name))

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't make request", "origin": "gateway", "reason": err.Error()})
	}

	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't parse response", "origin": "gateway", "reason": err.Error()})
	}

	var body_resp map[string]interface{}

	err = json.Unmarshal(body, &body_resp)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't send parsed response", "origin": "gateway", "reason": err.Error()})
	}

	return c.Status(200).JSON(body_resp)

}
