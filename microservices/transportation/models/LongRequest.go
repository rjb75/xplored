package models

type LongRequest struct {
	Origin        string `json:"origin"`
	Destination   string `json:"destination"`
	DepartureDate string `json:"departuredate"`
	ReturnDate    string `json:"returndate"`
	Adults        string `json:"adults"`
	Currency      string `json:"currency"`
}
