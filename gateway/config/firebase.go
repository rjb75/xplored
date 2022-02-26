package config

import (
	"context"
	"log"

	firebase "firebase.google.com/go"

	"google.golang.org/api/option"
)

func setupFirebase() *auth.Client {
	creds := option.WithCredentialsFile("../firebase-config.json")

	fbs, err := firebase.NewApp(context.Background(), nil, opt)

	if err != nil {
		log.Fatal("error connecting to firebase")
	}

	client, err := fbs.Auth(context.Background())
	if err != nil {
		log.Fatalf("error getting Auth client: %v\n", err)
	}

	return client

}
