package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/rjb75/xplored-api-gateway/handlers"
)

// routes for accommodations microservice
func AccommodationsRoutes(r fiber.Router) {
	r.Get("/accommodations", handlers.AccommodationHandler)
}

// Routes for dining microservice
func DiningRoutes(r fiber.Router) {
	r.Get("/dining", handlers.DiningHandler)
}

// Routes for photo microservice
func PhotoRoutes(r fiber.Router) {
	r.Get("/photo", handlers.PhotosHandler)
	r.Get("/photo/random", handlers.RandomPhotoHandler)
}

// Routes for POI microservice
func POIsRoutes(r fiber.Router) {
	r.Get("/pois", handlers.POIsHandler)
}

// Routes for recommendations microservice
func RecommendationsRoutes(r fiber.Router) {
	r.Get("/recommendations", handlers.RecommendationHandler)
}

// Routes for reviews microservice
func ReviewsRoutes(r fiber.Router) {
	r.Get("/reviews", handlers.ReviewsHandler)
	r.Get("/reviews/all", handlers.AllReviewsHandler)
	r.Post("/review", handlers.CreateReviewsHandler)
}

// Routes for travel planner microservice
func TPlannerRoutes(r fiber.Router) {
	r.Get("/trips", handlers.GetUserTrips)
	r.Get("/trip", handlers.GetTripById)
	r.Post("/trip", handlers.CreateTrip)
	r.Get("/trip/events", handlers.GetEventsByTripId)
	r.Get("/event", handlers.GetEventById)
	r.Delete("/event", handlers.DeleteEventById)
	r.Post("/event/edit", handlers.EditEventById)
	r.Post("/event/create", handlers.CreateEvent)
	r.Post("/trip/user", handlers.CreateUser)
}
