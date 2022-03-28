from fastapi.testclient import TestClient
import testSetup, pytest

recommendationClient = TestClient(testSetup.recommendationApp)

# Tests the root endpoint of the recommendation microservice.
def test_recommendationAppRootEndpoint():
    response = recommendationClient.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

# Tests the recommendation endpoint of the recommendation microservice with a valid country.
def test_recommendationAppValidCountryRecommendationEndpoint():
    response = recommendationClient.get("/recom/api/v1/?location_name=malta")
    assert response.status_code == 200
    assert response.json() == {"city": "",
                               "country": "Malta",
                               "details": [
                               "Pickpocketing and petty crimes are known to occur in Malta. Be careful when attending ATMs, buses, or popular locations.",
                               "As of February 24, only up to 6 people are allowed to gather together in public spaces.",
                               "Face masks are mandatory in all public places, however are not necessary outdoors if a booster has been received."
                                ]
                              }

# Tests the recommendation endpoint of the recommendation microservice with an invalid country.
def test_recommendationAppInvalidCountryRecommendationEndpoint():
    response = recommendationClient.get("/recom/api/v1/?location_name=invalidCountry")
    assert response.status_code == 404
    assert response.json() == {"detail": "Location not found"}

# Tests the recommendation endpoint of the recommendation microservice with a valid city.
def test_recommendationAppValidCityRecommendationEndpoint():
    response = recommendationClient.get("/recom/api/v1/?location_name=canmore")
    assert response.status_code == 200
    assert response.json() == {"city": "Canmore",
                               "country": "Canada",
                               "details": [
                               "If you are choosing to hike in Canmore or surrounding areas, make sure you are prepared. Let others know where you are going and travel in a group if possible. Always ensure that you make your presence known by making noise when on the trails. Please do not leave garbage or any other belongings on your journey, and especially do not feed any wildlife."
                                ]
                               }

# Tests the recommendation endpoint of the recommendation microservice with an invalid city.
def test_recommendationAppInvalidCityRecommendationEndpoint():
    response = recommendationClient.get("/recom/api/v1/?location_name=invalidCity")
    assert response.status_code == 404
    assert response.json() == {"detail": "Location not found"}