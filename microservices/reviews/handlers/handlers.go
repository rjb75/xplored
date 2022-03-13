package handlers

import (
	"context"
	"fmt"
	"os"
	"strings"

	// "strconv"
	// "strings"

	"github.com/gofiber/fiber/v2"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"

	"github.com/kr/pretty"
	_ "github.com/lib/pq"
)

type TagsQuery struct {
	Tags string `query:"tags"`
}

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

type PostStruct struct {
	FirstName   string   `json:"first_name" bson:"first_name"`
	LastName    string   `json:"last_name" bson:"last_name"`
	UserID      string   `json:"user_id" bson:"user_id"`
	Title       string   `json:"title" bson:"title"`
	Stars       string   `json:"stars" bson:"stars"`
	Tags        []string `json:"tags" bson:"tags"`
	Description string   `json:"description" bson:"description"`
}

func SearchTag(c *fiber.Ctx) error {
	reviewsDB := os.Getenv("REVIEWS_DB")

	q := new(TagsQuery)
	err := c.QueryParser(q)
	plusFormattedTags := strings.Split(q.Tags, " ")

	if q.Tags == "" {
		return c.Status(400).JSON(fiber.Map{"status": "fail", "type": "Request Error", "cause": "Tag(s) are required for query"})
	}

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(reviewsDB))

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't connect to database"})
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	//ping primary
	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "fail", "type": "Server Error", "cause": "Couldn't connect to database"})
	}

	db := client.Database("user_reviews").Collection("reviews")
	tags := plusFormattedTags

	for i, t := range tags {
		tags[i] = "#" + t
	}
	pretty.Println(bson.D{{"tags", tags}})

	findTags := options.Find()
	var results []ResultStruct

	cur, err := db.Find(context.TODO(), bson.D{{"tags", tags[0]}}, findTags)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": err})
	}

	for cur.Next(context.TODO()) {
		var elem ResultStruct
		err := cur.Decode(&elem)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"status": err})
		}
		if IDMatch(elem.Tags, tags) {
			results = append(results, elem)
		}
	}

	if err := cur.Err(); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": err})
	}

	cur.Close(context.TODO())
	fmt.Printf("Found multiple documents + %+v\n", results)

	fmt.Println("Successfully connected and pinged")

	pretty.Print(results)

	return c.Status(200).JSON(results)
}

func IDMatch(elementTags []string, queryTags []string) bool {

	for _, query := range queryTags {
		if !TagsContains(query, elementTags) {
			return false
		}
	}
	return true
}

func TagsContains(searchTag string, elementTags []string) bool {
	for _, tag := range elementTags {
		if tag == searchTag {
			return true
		}
	}
	return false
}

/*
	This function will search for all reviews in the database
*/
func AllReviews(c *fiber.Ctx) error {
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

	db := client.Database("user_reviews").Collection("reviews")

	cur, err := db.Find(context.TODO(), bson.D{})

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": err})
	}
	var results []ResultStruct

	for cur.Next(context.TODO()) {
		var elem ResultStruct
		err := cur.Decode(&elem)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"status": err})
		}
		results = append(results, elem)
	}

	if err := cur.Err(); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": err})
	}

	cur.Close(context.TODO())
	return c.Status(200).JSON(results)
}

func PostTag(c *fiber.Ctx) error {
	review := new(PostStruct)
	err := c.BodyParser(review)

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

	db := client.Database("user_reviews").Collection("reviews")

	res, err := db.InsertOne(context.TODO(), review)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": err})
	}

	return c.Status(200).JSON(fiber.Map{"insert_id": res.InsertedID})
}
