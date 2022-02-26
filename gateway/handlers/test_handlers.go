package handlers

import (
	"github.com/gofiber/fiber/v2"
)

func SuccessHandler(c *fiber.Ctx) error {
	return c.Status(200).SendString("Success")
}

func FailHandler(c *fiber.Ctx) error {
	return c.Status(500).SendString("Failure")
}
