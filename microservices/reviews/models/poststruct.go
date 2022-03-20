package models

//struct to be used for Post requests, does not include ID as it is automatic
type PostStruct struct {
	FirstName   string   `json:"first_name" bson:"first_name"`
	LastName    string   `json:"last_name" bson:"last_name"`
	UserID      string   `json:"user_id" bson:"user_id"`
	Title       string   `json:"title" bson:"title"`
	Stars       string   `json:"stars" bson:"stars"`
	Tags        []string `json:"tags" bson:"tags"`
	Description string   `json:"description" bson:"description"`
}
