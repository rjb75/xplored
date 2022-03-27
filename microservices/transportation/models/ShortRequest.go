package models

import (
	"googlemaps.github.io/maps"
)
type ShortRequest struct {
	Origin        string `json:"origin"`
	Destination   string `json:"destination"`
	DepartureTime string `json:"departuretime"`
	ArrivalTime   string `json:"arrivaltime"`
	Mode   maps.Mode `json:"mode"`
}