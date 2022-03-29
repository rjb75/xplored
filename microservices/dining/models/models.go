package models

type DiningRequest struct {
	Address string `json:"address"`
	Keyword string `json:"keyword"`
	Radius  string `json:"radius"`
}

type Coordinates struct {
	Latitude  float64 `json:"lat"`
	Longitude float64 `json:"lng"`
	Radius    int     `json:"radius"`
	Keyword   string  `json:"keyword"`
}
