package middleware

import (
	"fmt"
	"os"

	firebase "firebase.google.com/go"
)

// variables for authentication middleware
type AuthConfig struct {
	FirebaseApp *firebase.App
	IgnorePaths []string
	Token       string
}

// default configuration settings
func configDefault(config ...AuthConfig) AuthConfig {
	cfg := config[0]

	if cfg.FirebaseApp == nil {
		fmt.Errorf("Firebase app not declared")
	}

	cfg.Token = os.Getenv("AUTH_TOKEN")

	return cfg

}
