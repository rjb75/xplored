package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/Risath18/xplored-dining/models"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)


func main() {
//	app := fiber.New()

	//Setting up Environment Variables
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	GetDiningOptions("461 Skyview Shores Manor", "Calgary", "Alberta", "1000", "Tim Hortons")
	
	//Formatting port
	// SERVER_PORT := os.Getenv("DINING_PORT")
	// port := fmt.Sprintf(":%s", SERVER_PORT)
	// app.Listen(port)
}


func GetDiningOptions(street_address string, city string, country string, radius string, keyword string){
	//Format Address
	plusFormattedAddress := strings.ReplaceAll("+" + street_address, " ", "+")
	plusFormattedCity := strings.ReplaceAll("+" + city, " ", "+")
	plusFormattedCountry := strings.ReplaceAll("+" + country, " ", "+")

	//Format Keyword
	plusFormattedKeyword := strings.ReplaceAll("+" + keyword, " ", "+")

	//Combine Address
	address := fmt.Sprintf("%s,%s,%s", plusFormattedAddress, plusFormattedCity, plusFormattedCountry) 

	//Calculate Longitude & Latitude
	var lc models.Location_class = GeoCode(address)

	//Get Dining Data
	var Result models.Response = Places(lc, radius, plusFormattedKeyword)
	fmt.Println(Result) //Debugging Print Statement
}


/*
* GeoCode API to determine Longitude and Latitude of given ADDRESS
* Returns a struct with Longitude and Latitude
*/
func GeoCode(address string) models.Location_class{
	var lc models.Location_class
	client := &http.Client{}
	req, err := http.NewRequest(http.MethodGet, "https://maps.googleapis.com/maps/api/geocode/json?", nil)
	if err != nil {
		log.Fatal(err)
	}

	// appending to existing query args
	q := req.URL.Query()
	q.Add("address", address) //Formatted Address with requred '+'
	q.Add("key", os.Getenv("DINING_API")) //API Key

	// assign encoded query string to http request
	req.URL.RawQuery = q.Encode()

	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error when sending request to the server")
		return lc
	}

	defer resp.Body.Close()
	responseBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	var rp models.GCR	
	json.Unmarshal([]byte(string(responseBody)), &rp)
	lc = rp.Results[0].Geometry.Location
	return lc
}

/*
* Places API to determine Dining Options in a fixed RADIUS, KEYWORD with given ADDRESS
* Returns a struct with information of restaurants and status
*/
func Places(lc	models.Location_class, radius string, keyword string) models.Response {
	var Result models.Response
	client := &http.Client{}
	req, err := http.NewRequest(http.MethodGet, "https://maps.googleapis.com/maps/api/place/nearbysearch/json?", nil)
	if err != nil {
		log.Fatal(err)
	}

	//Format Coordinates
	coords := fmt.Sprintf("%f, %f", lc.Lat, lc.Lng)


	// appending to existing query args
	q := req.URL.Query()
	q.Add("location", coords) //Longitude and Latitude
	q.Add("radius", radius) //in Meters
	q.Add("keyword", keyword) //Searching
	q.Add("key", os.Getenv("DINING_API")) //API Key

	// assign encoded query string to http request
	req.URL.RawQuery = q.Encode()

	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error when sending request to the server")
		return Result
	}

	defer resp.Body.Close()
	responseBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	//Formatting with Model
	Result.Json = string(responseBody)
	Result.Status = resp.Status
	return Result
}