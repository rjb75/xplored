package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/rjb75/xplored-api-gateway/models"
)

// temporary location of dining URI, will move to .env
const DiningURI = "http://127.0.0.1:3002/dining/api/v1/"

// handler for dining microservice
func DiningHandler(c *fiber.Ctx) error {

	req := new(models.DiningRequest)

	err := c.QueryParser(req)

	if err != nil {
		fmt.Println(err.Error())
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Request Error", "cause": "Missing request properties", "origin": "gateway"})
	}

	resp, err := http.Get(fmt.Sprintf("%s%s/%s/%d", DiningURI, req.Address, req.Keyword, req.Radius))

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't make request", "origin": "gateway", "reason": err.Error()})
	}

	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't parse response", "origin": "gateway"})
	}

	var body_resp map[string]interface{}

	err = json.Unmarshal(body, &body_resp)

	res, err := json.Marshal(body_resp["data"].(map[string]interface{}))

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't parse response", "origin": "gateway"})
	}

	return c.Status(201).Send(res)
}
