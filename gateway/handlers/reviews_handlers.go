package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/rjb75/xplored-api-gateway/models"
)

// handler for getting reviews by tag
func ReviewsHandler(c *fiber.Ctx) error {

	ReviewsURI := fmt.Sprintf("http://%s:%s/reviews/api/v1/", os.Getenv("GATEWAY_REVIEWS_HOST"), os.Getenv("REVIEWS_PORT"))

	req := new(models.ReviewTagQuery)

	err := c.QueryParser(req)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Request Error", "cause": "Missing request properties", "origin": "gateway"})
	}

	query, err := http.NewRequest("GET", fmt.Sprintf("%s%s", ReviewsURI, "tags"), nil)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't form request", "origin": "gateway", "reason": err.Error()})
	}

	q := query.URL.Query()
	q.Add("tags", req.Tags)
	query.URL.RawQuery = q.Encode()

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
func AllReviewsHandler(c *fiber.Ctx) error {

	ReviewsURI := fmt.Sprintf("http://%s:%s/reviews/api/v1/alltags", os.Getenv("GATEWAY_REVIEWS_HOST"), os.Getenv("REVIEWS_PORT"))

	resp, err := http.Get(ReviewsURI)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't make request", "origin": "gateway", "reason": err.Error()})
	}

	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't parse response", "origin": "gateway"})
	}

	return c.Status(200).Send(body)
}

func CreateReviewsHandler(c *fiber.Ctx) error {
	ReviewsURI := fmt.Sprintf("http://%s:%s/reviews/api/v1/tag", os.Getenv("GATEWAY_REVIEWS_HOST"), os.Getenv("REVIEWS_PORT"))

	req := new(models.ReviewCreation)

	err := c.BodyParser(req)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Request Error", "cause": "Missing request properties", "origin": "gateway"})
	}

	review_data, err := json.Marshal(req)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't form request", "origin": "gateway", "reason": err.Error()})
	}

	query, err := http.Post(ReviewsURI, "application/json", bytes.NewBuffer(review_data))

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't form request", "origin": "gateway", "reason": err.Error()})
	}

	body, err := ioutil.ReadAll(query.Body)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't parse response", "origin": "gateway"})
	}

	return c.Status(200).Send(body)
}
