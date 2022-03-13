package handlers

import (
	"context"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"

	_ "github.com/lib/pq"
)

//identifier for the tags component of a database entity
type TagsQuery struct {
	Tags string `query:"tags"`
}

//struct to be used for get requests. Includes a unique, system-given ID
type ResultStruct struct {
	Id          primitive.ObjectID `json:"_id" bson:"_id"`
	FirstName   string             `json:"first_name" bson:"first_name"`
	LastName    string             `json:"last_name" bson:"last_name"`
	UserID      string             `json:"user_id" bson:"user_id"`
	Title       string             `json:"title" bson:"title"`
	Stars       string             `json:"stars" bson:"stars"`
	Tags        []string           `json:"tags" bson:"tags"`
	Description string             `json:"description" bson:"description"`
}

//struct to be used for Post requests, does not include ID as it is automatic
type PostStruct struct {
	FirstName   string   `json:"first_name" bson:"first_name"`
	LastName    string   `json:"last_name" bson:"last_name"`
	UserID      string   `json:"user_id" bson:"user_id"`
	Title       string   `json:"title" bson:"title"`
	Stars       string   `json:"stars" bson:"stars"`
	Tags        []string `json:"tags" bson:"tags"`
	Description string   `json:"description" bson:"description"`
}

//This function searches the reviews database for any reviews contatining specified hashtags. It will append its own hashes to the tags
//will return a status 200 if the query works
func SearchTag(c *fiber.Ctx) error {
	reviewsDB := os.Getenv("REVIEWS_DB")

	q := new(TagsQuery)
	err := c.QueryParser(q)
	plusFormattedTags := strings.Split(q.Tags, " ") //split the query into individual tags

	//no tags sent, invalid request
	if q.Tags == "" {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Request Error", "cause": "Tag(s) are required for query"})
	}

	//connect to the database
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(reviewsDB))
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't connect to database"})
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	//ping primary to test and see if the database is responsive
	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't connect to database"})
	}
	// fmt.Println("Successfully connected and pinged")

	//read the reviews collection of the user reviews database
	db := client.Database("user_reviews").Collection("reviews")
	tags := plusFormattedTags

	//add hashtags to each tag given by the user
	for i, t := range tags {
		tags[i] = "#" + t
	}
	// pretty.Println(bson.D{{"tags", tags}})

	findTags := options.Find()
	var results []ResultStruct

	//search the database for the tag at index 0
	cur, err := db.Find(context.TODO(), bson.D{{"tags", tags[0]}}, findTags)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": err})
	}

	//loop through all documents and ensure they stored properly
	for cur.Next(context.TODO()) {
		var elem ResultStruct
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
	//connect to the database
	reviewsDB := os.Getenv("REVIEWS_DB")
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(reviewsDB))

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": err})
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	//ping primary
	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": err})
	}
	// fmt.Println("Successfully connected and pinged")

	//establish a connection to the given table and collection
	db := client.Database("user_reviews").Collection("reviews")

	cur, err := db.Find(context.TODO(), bson.D{})

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": err})
	}
	var results []ResultStruct //all results in an array

	//iterate through all the elements
	for cur.Next(context.TODO()) {
		var elem ResultStruct
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
	review := new(PostStruct)   //create a new object
	err := c.BodyParser(review) //parse the user's input

	for i, tag := range review.Tags {
		review.Tags[i] = "#" + tag
	}

	//connect to the database
	reviewsDB := os.Getenv("REVIEWS_DB")
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(reviewsDB))

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": err})
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	//ping primary
	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": err})
	}
	// fmt.Println("Successfully connected and pinged")

	//connect to the given table and collection
	db := client.Database("user_reviews").Collection("reviews")

	res, err := db.InsertOne(context.TODO(), review) //insert the single entity to the database

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": err})
	}

	return c.Status(200).JSON(fiber.Map{"insert_id": res.InsertedID}) //return the newly inserted object's ID
}
