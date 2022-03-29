package handlers

import (
	"context"

	"github.com/rjb75/xplored-poi/logs"
	"github.com/rjb75/xplored-poi/models"
	"googlemaps.github.io/maps"
)

// helper function to get latitude and longitude from address
func Latlon(req *models.POIRequest, cli *maps.Client) maps.LatLng {

	r := &maps.GeocodingRequest{
		Address: req.Address,
		// Region:  req.Region,
	}

	var loc maps.LatLng

	place, err := cli.Geocode(context.Background(), r)

	if err != nil {
		logs.ErrorLogger.Println("Error geocoding")
	}

	if len(place) > 0 {
		loc.Lat = place[0].Geometry.Location.Lat
		loc.Lng = place[0].Geometry.Location.Lng
	} else {
		loc.Lat = 0.0
		loc.Lng = 0.0
	}

	return loc

}
