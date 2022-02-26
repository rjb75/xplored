package models

type POIRequest struct {
	Address string `json:"address"`
	Region  string `json:"region"`
	Type    string `json:"type"`
}
