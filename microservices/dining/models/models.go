package models

type DiningRequest struct {
	Address string `json:"address"`
	Keyword string `json:"keyword"`
	Radius  string `json:"radius"`
}

type Coordinates struct {
	Lat     float64 `json:"lat"`
	Lng     float64 `json:"lng"`
	Radius  int     `json:"radius"`
	Keyword string  `json:"keyword"`
}
