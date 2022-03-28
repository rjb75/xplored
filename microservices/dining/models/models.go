package models

type DiningRequest struct {
	Address string `json:"address"`
	Keyword string `json:"keyword"`
	Radius  string `json:"radius"`
}
