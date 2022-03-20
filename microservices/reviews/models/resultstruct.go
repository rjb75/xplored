package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ResultStruct struct {
	Id          primitive.ObjectID `json:"_id" bson:"_id"`
	FirstName   string             `json:"first_name" bson:"first_name"`
	LastName    string             `json:"last_name" bson:"last_name"`
	UserID      string             `json:"user_id" bson:"user_id"`
	Title       string             `json:"title" bson:"title"`
	Stars       string             `json:"stars" bson:"stars"`
	Tags        []string           `json:"tags" bson:"tags"`
	Description string             `json:"description" bson:"description"`
}
