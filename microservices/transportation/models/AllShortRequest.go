package models

type AllShortRequest struct {
	Origin        string `json:"origin"`
	Destination   string `json:"destination"`
	DepartureTime string `json:"departuretime"`
	ArrivalTime   string `json:"arrivaltime"`
}