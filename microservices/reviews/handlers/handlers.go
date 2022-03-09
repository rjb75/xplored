package handlers

import (
	"context"
	"fmt"
	"log"
	"os"

	// "strconv"
	// "strings"

	"github.com/gofiber/fiber/v2"
	"github.com/kr/pretty"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"

	"github.com/kr/pretty"
	_ "github.com/lib/pq"
)

func SearchTag(c *fiber.Ctx) error {
	reviewsDB := os.Getenv("REVIEWS_DB")

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(reviewsDB))

	if err != nil {
		panic(err)
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	//ping primary
	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
		panic(err)
	}

	db := client.Database("user_reviews").Collection("reviews")
	tags := "#paris"
	// var result bson.M

	findTags := options.Find()
	// findTags.SetLimit(10)
	var results []interface{}
	cur, err := db.Find(context.TODO(), bson.D{{"tags", tags}}, findTags)

	if err != nil {
		log.Fatal(err)
	}

	for cur.Next(context.TODO()) {
		var elem interface{}
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}

		results = append(results, elem)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	cur.Close(context.TODO())
	fmt.Printf("Found multiple documents + %+v\n", results)
	// err = db.FindOne(context.TODO(), bson.D{{"tags", tags}}).Decode(&result)
	// if err == mongo.ErrNoDocuments {
	// 	fmt.Printf("No document was found with the tag %s\n", tags)
	// 	return c.Status(500).SendString("error")
	// }
	// if err != nil {
	// 	panic(err)
	// }
	// // jsonData, err := json.MarshalIndent(result, "", "    ")
	// if err != nil {
	// 	panic(err)
	// }
	// fmt.Println(result)

	fmt.Println("Successfully connected and pinged")

	pretty.Print(results)
	return c.Status(200).JSON(results)
}
