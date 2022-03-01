package models

// model for dining microservice request
type DiningRequest struct {
	Address string `json:"address"`
	Keyword string `json:"keyword"`
	Radius  int    `json:"radius"`
}
