package models

type POIRequest struct {
	Address string `json:"address"`
	Keyword string `json:"keyword"`
	Radius  int    `json:"radius"`
}
