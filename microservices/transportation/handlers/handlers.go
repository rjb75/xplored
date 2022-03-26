package handlers

import (
	// "context"
	// "log"
	// "os"
	// "strconv"

	"github.com/Risath18/xplored-transportation/models"
	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
)

func GetTransLong(c *fiber.Ctx) error {
	req := new(models.LongTrip)

	err := c.QueryParser(req)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Body Error", "cause": "Couldn't process request body"})
	}

	//check that data isn't null
	//if req.___ == null

	//data := longOptions(req)

	return c.Status(200).JSON(fiber.Map{"status": err, "data": nil})
}

func GetTransShort(c *fiber.Ctx) error {
	req := new(models.ShortTrip)

	err := c.QueryParser(req)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Body Error", "cause": "Couldn't process request body"})
	}

	//check that data isn't null
	//if req.___ == null

//	data := shortOptions(req)

	return c.Status(200).JSON(fiber.Map{"status": err, "data": nil})
}

// func longOptions(trans *models.LongTrip) {

// }

// func shortOptions(trans *models.LongTrip) {

// }
