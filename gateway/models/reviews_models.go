package models

// model to query for a review by tags
type ReviewTagQuery struct {
	Tags string `json:"tags" query:"tags"`
}

// model to post review
type ReviewCreation struct {
	FirstName   string   `json:"first_name"`
	LastName    string   `json:"last_name"`
	UserID      string   `json:"user_id"`
	Title       string   `json:"title"`
	Stars       string   `json:"stars"`
	Tags        []string `json:"tags"`
	Description string   `json:"description"`
}
