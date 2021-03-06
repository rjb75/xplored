package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
)

func RecommendationHandler(c *fiber.Ctx) error {

	RecommendationURI := fmt.Sprintf("http://%s:%s/recom/api/v1/", os.Getenv("GATEWAY_RECOMMENDATION_HOST"), os.Getenv("RECOMMENDATION_PORT"))

	params := c.Request().URI().QueryString()

	query, err := http.NewRequest("GET", RecommendationURI, nil)

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

	var body_resp map[string]interface{}

	err = json.Unmarshal(body, &body_resp)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't send parsed response", "origin": "gateway", "reason": err.Error()})
	}

	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).JSON(body_resp)
	}

	return c.Status(200).JSON(body_resp)

}
