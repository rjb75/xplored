package middleware

import (
	"context"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

// authentication middleware function
func NewAuth(config AuthConfig) fiber.Handler {
	cfg := configDefault(config)

	return func(c *fiber.Ctx) error {

		IDToken := c.Get(fiber.HeaderAuthorization)

		if len(IDToken) == 0 {
			return c.Status(401).JSON(fiber.Map{"error": "Invalid access token"})
		}

		firebaseAuth, err := cfg.FirebaseApp.Auth(context.Background())

		if err != nil {
			fmt.Println(err.Error())
		}

		tkn, err := firebaseAuth.VerifyIDToken(context.Background(), IDToken)

		if err != nil {
			return c.Status(401).JSON(fiber.Map{"error": "Malformed access token"})
		}

		c.Locals("user_id", (tkn.Claims["user_id"]).(string))

		return c.Next()

	}
}
