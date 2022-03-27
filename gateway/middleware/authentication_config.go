package middleware

import (
	"fmt"

	firebase "firebase.google.com/go"
)

// variables for authentication middleware
type AuthConfig struct {
	FirebaseApp *firebase.App
	IgnorePaths []string
}

// default configuration settings
func configDefault(config ...AuthConfig) AuthConfig {
	cfg := config[0]

	if cfg.FirebaseApp == nil {
		fmt.Errorf("Firebase app not declared")
	}

	return cfg

}
