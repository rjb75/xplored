package models

type POIRequest struct {
	Address string `json:"address"`
	Keyword string `json:"keyword"`
	Radius  int    `json:"radius"`
}

type POIRequestLatLng struct {
	Lat     float64 `json:"lat"`
	Lng     float64 `json:"lng"`
	Radius  int     `json:"radius"`
	Keyword string  `json:"keyword"`
}
