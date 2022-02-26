package handlers

import (
	"context"

	"github.com/rjb75/xplored-poi/logs"
	"github.com/rjb75/xplored-poi/models"
	"googlemaps.github.io/maps"
)

// helper function to get latitude and longitude from address
func latlon(req *models.POIRequest, cli *maps.Client) maps.LatLng {

	r := &maps.GeocodingRequest{
		Address: req.Address,
		Region:  req.Region,
	}

	place, err := cli.Geocode(context.Background(), r)

	if err != nil {
		logs.ErrorLogger.Println("Error geocoding")
	}

	loc := maps.LatLng{
		Lat: place[0].Geometry.Location.Lat,
		Lng: place[0].Geometry.Location.Lng,
	}

	return loc

}
