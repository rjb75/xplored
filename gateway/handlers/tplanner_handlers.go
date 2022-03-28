package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
)

func CreateUser(c *fiber.Ctx) error {
	PlannerURI := fmt.Sprintf("http://%s:%s/planner/api/v1/user", os.Getenv("GATEWAY_TPLANNER_HOST"), os.Getenv("TPLANNER_PORT"))

	params := c.Request().URI().QueryString()

	uid := c.Locals("user_id")

	if uid == nil {
		return c.Status(401).JSON(fiber.Map{"status": "fail", "type": "Authentication Error", "cause": "Invalid access token", "origin": "gateway"})
	}

	req_body := make(map[string]interface{})

	req_body["authId"] = uid

	req_json, err := json.Marshal(req_body)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't form body of request", "origin": "gateway", "reason": err.Error()})
	}

	body_reader := bytes.NewReader(req_json)

	query, err := http.NewRequest("POST", PlannerURI, body_reader)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't form request", "origin": "gateway", "reason": err.Error()})
	}

	query.Header.Add("Content-Type", "application/json")
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

	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).Send(body)
	}

	return c.Status(200).Send(body)
}

func GetEventById(c *fiber.Ctx) error {
	PlannerURI := fmt.Sprintf("http://%s:%s/planner/api/v1/event", os.Getenv("GATEWAY_TPLANNER_HOST"), os.Getenv("TPLANNER_PORT"))

	params := c.Request().URI().QueryString()

	query, err := http.NewRequest("GET", PlannerURI, nil)

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

func GetEventsByTripId(c *fiber.Ctx) error {
	PlannerURI := fmt.Sprintf("http://%s:%s/planner/api/v1/alltrips", os.Getenv("GATEWAY_TPLANNER_HOST"), os.Getenv("TPLANNER_PORT"))

	params := c.Request().URI().QueryString()

	query, err := http.NewRequest("GET", PlannerURI, nil)

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

func GetUserTrips(c *fiber.Ctx) error {
	PlannerURI := fmt.Sprintf("http://%s:%s/planner/api/v1/usertrips", os.Getenv("GATEWAY_TPLANNER_HOST"), os.Getenv("TPLANNER_PORT"))

	query, err := http.NewRequest("GET", PlannerURI, nil)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't form request", "origin": "gateway", "reason": err.Error()})
	}

	uid := c.Locals("user_id")

	if uid == nil {
		return c.Status(401).JSON(fiber.Map{"status": "fail", "type": "Authentication Error", "cause": "Invalid access token", "origin": "gateway"})
	}

	q := query.URL.Query()
	q.Add("authid", uid.(string))
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

	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).Send(body)
	}

	return c.Status(200).Send(body)

}

func GetTripById(c *fiber.Ctx) error {
	PlannerURI := fmt.Sprintf("http://%s:%s/planner/api/v1/trip", os.Getenv("GATEWAY_TPLANNER_HOST"), os.Getenv("TPLANNER_PORT"))

	params := c.Request().URI().QueryString()

	query, err := http.NewRequest("GET", PlannerURI, nil)

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

	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).Send(body)
	}

	return c.Status(200).Send(body)

}

func CreateEvent(c *fiber.Ctx) error {
	PlannerURI := fmt.Sprintf("http://%s:%s/planner/api/v1/event", os.Getenv("GATEWAY_TPLANNER_HOST"), os.Getenv("TPLANNER_PORT"))

	params := c.Request().URI().QueryString()

	body_reader := bytes.NewReader(c.Request().Body())
	query, err := http.NewRequest("POST", PlannerURI, body_reader)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't form request", "origin": "gateway", "reason": err.Error()})
	}

	query.Header.Add("Content-Type", "application/json")
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

	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).Send(body)
	}

	return c.Status(200).Send(body)
}

func EditEventById(c *fiber.Ctx) error {
	PlannerURI := fmt.Sprintf("http://%s:%s/planner/api/v1/editevent", os.Getenv("GATEWAY_TPLANNER_HOST"), os.Getenv("TPLANNER_PORT"))

	params := c.Request().URI().QueryString()

	body_reader := bytes.NewReader(c.Request().Body())
	query, err := http.NewRequest("POST", PlannerURI, body_reader)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't form request", "origin": "gateway", "reason": err.Error()})
	}

	query.Header.Add("Content-Type", "application/json")
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

	if resp.StatusCode != 200 {
		return c.Status(resp.StatusCode).Send(body)
	}

	return c.Status(200).Send(body)

}
