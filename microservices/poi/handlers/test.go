package handlers

import (
	"github.com/gofiber/fiber/v2"
)

// test success endpoint
func SuccessHandler(c *fiber.Ctx) error {
	return c.Status(200).JSON(fiber.Map{"status": "success"})
}

// test failure endpoint
func FailHandler(c *fiber.Ctx) error {
	return c.Status(500).JSON(fiber.Map{"status": "fail"})
}
