package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)


func main() {
	app := fiber.New()

	//Setting up Environment Variables
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	 //GeoCode()
	 //Places()

	//Formatting port
	SERVER_PORT := os.Getenv("DINING_PORT")
	port := fmt.Sprintf(":%s", SERVER_PORT)
	app.Listen(port)
}


func GeoCode(){
	client := &http.Client{}
	req, err := http.NewRequest(http.MethodGet, "https://maps.googleapis.com/maps/api/geocode/json?", nil)
	if err != nil {
		log.Fatal(err)
	}

	// appending to existing query args
	q := req.URL.Query()
	q.Add("address", "461+Skyview+Shores+Manor,+Calgary,+AB") //Formatted Address with requred '+'
	q.Add("key", os.Getenv("DINING_API")) //API Key

	// assign encoded query string to http request
	req.URL.RawQuery = q.Encode()

	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error when sending request to the server")
		return
	}

	defer resp.Body.Close()
	responseBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	//fmt.Println(resp.Status)
	fmt.Println(string(responseBody))
	
	//TODO: Parser Not working
	// var rp GCR	
	// json.Unmarshal([]byte(string(responseBody)), &rp)
	// fmt.Printf("Lat: %s", rp)
}

func Places(){
	client := &http.Client{}
	req, err := http.NewRequest(http.MethodGet, "https://maps.googleapis.com/maps/api/place/nearbysearch/json?", nil)
	if err != nil {
		log.Fatal(err)
	}

	// appending to existing query args
	q := req.URL.Query()
	q.Add("location", "51.15718593079007, -113.96789149778814") //Longitude and Latitude
	q.Add("radius", "3000") //in Meters
	q.Add("keyword", "TimHortons") //Searching
	q.Add("key", os.Getenv("DINING_API")) //API Key

	// assign encoded query string to http request
	req.URL.RawQuery = q.Encode()

	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error when sending request to the server")
		return
	}

	defer resp.Body.Close()
	responseBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(resp.Status)
	fmt.Println(string(responseBody))
}