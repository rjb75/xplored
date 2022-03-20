package handlers

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"github.com/alexishamrak/xplored-reviews/microservices/reviews/models"
	"github.com/gofiber/fiber/v2"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	_ "github.com/lib/pq"
)

var DB *mongo.Collection

func DBConnect() {
	reviewsDB := os.Getenv("REVIEWS_DB")

	// client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(reviewsDB))
	client, err := mongo.NewClient(options.Client().ApplyURI(reviewsDB))
	if err != nil {
		fmt.Println("Failed to connect to database.")
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	//ping primary to test and see if the database is responsive
	err = client.Ping(ctx, nil)
	if err != nil {
		fmt.Println("Failed to connect to database.")
	}

	//read the reviews collection of the user reviews database
	db := client.Database("user_reviews").Collection("reviews")
	DB = db
}

//This function searches the reviews database for any reviews contatining specified hashtags. It will append its own hashes to the tags
//will return a status 200 if the query works
func SearchTag(c *fiber.Ctx) error {
	q := new(models.TagsQuery)
	err := c.QueryParser(q)
	if err != nil {
		fmt.Println("Failed to connect to database.")
	}
	plusFormattedTags := strings.Split(q.Tags, " ") //split the query into individual tags

	//no tags sent, invalid request
	if q.Tags == "" {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Request Error", "cause": "Tag(s) are required for query"})
	}

	tags := plusFormattedTags

	//add hashtags to each tag given by the user
	for i, t := range tags {
		tags[i] = "#" + t
	}
	// pretty.Println(bson.D{{"tags", tags}})

	findTags := options.Find()
	var results []models.ResultStruct

	//search the database for the tag at index 0
	cur, err := DB.Find(context.TODO(), bson.D{{"tags", tags[0]}}, findTags)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": err})
	}

	//loop through all documents and ensure they stored properly
	for cur.Next(context.TODO()) {
		var elem models.ResultStruct
		err := cur.Decode(&elem)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"status": err})
		}
		if MatchTags(elem.Tags, tags) { //check to see if the item's hashtags match the ones specified by the user
			results = append(results, elem) //add the element to the results to be returned to the user
		}
	}

	if err := cur.Err(); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": err})
	}

	//close the cursor
	cur.Close(context.TODO())

	// fmt.Printf("Found multiple documents + %+v\n", results)
	// pretty.Print(results)

	return c.Status(200).JSON(results) //return the results that match the search
}

//check to see if the hashtags of an element match those of a given query
func MatchTags(elementTags []string, queryTags []string) bool {

	for _, query := range queryTags {
		if !TagsContains(query, elementTags) { //no tag found, we don't add it to the results
			return false
		}
	}
	return true //tag found, add it to the results
}

//helper function to check if a specific tag matches any inside an object from the database
func TagsContains(searchTag string, elementTags []string) bool {
	for _, tag := range elementTags {
		if tag == searchTag { //tag matches, we can keep the element for now
			return true
		}
	}
	return false //tag does not match, we don't want the element
}

//This function will search for all reviews in the database
func AllReviews(c *fiber.Ctx) error {
	cur, err := DB.Find(context.TODO(), bson.D{})

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": err})
	}
	var results []models.ResultStruct //all results in an array

	//iterate through all the elements
	for cur.Next(context.TODO()) {
		var elem models.ResultStruct
		err := cur.Decode(&elem)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"status": err})
		}
		results = append(results, elem) //add any result from the database to the results
	}

	if err := cur.Err(); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": err})
	}

	cur.Close(context.TODO())          //close the cursor
	return c.Status(200).JSON(results) //return all results
}

//this function will fulfill a post request by adding an element to the database
func PostTag(c *fiber.Ctx) error {
	review := new(models.PostStruct) //create a new object
	err := c.BodyParser(review)      //parse the user's input
	if err != nil {
		fmt.Println("Failed to connect to database.")
	}

	for i, tag := range review.Tags {
		review.Tags[i] = "#" + tag
	}
	// fmt.Println("Successfully connected and pinged")

	res, err := DB.InsertOne(context.TODO(), review) //insert the single entity to the database

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": err})
	}

	return c.Status(200).JSON(fiber.Map{"insert_id": res.InsertedID}) //return the newly inserted object's ID
}
