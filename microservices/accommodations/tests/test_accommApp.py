from fastapi.testclient import TestClient
from fastapi import FastAPI, HTTPException
import testSetup, pytest, accommFunctions

accommClient = TestClient(testSetup.accommodationApp)

# Tests the root endpoint of the accommodation microservice.
def test_accommodationRootEndpoint():
    response = accommClient.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

# Tests the accommodation endpoint of the accommodation microservice with valid query parameters.
def test_accommodationValidQueriesHotelInfoEndpoint():
    response = accommClient.get("/accom/api/v1/?location=berlin&no_of_adults=2&no_of_children=0&no_of_rooms=1&check_in=2022-09-12&checkout=2022-09-14&currency=CAD")
    assert response.status_code == 200

# Tests the accommodation endpoint of the accommodation microservice with valid query parameters and optional query parameter of order_by contain popularity.
def test_accommodationValidQueriesOrderByPopularityHotelInfoEndpoint():
    response = accommClient.get("/accom/api/v1/?location=berlin&no_of_adults=2&no_of_children=0&no_of_rooms=1&check_in=2022-09-12&checkout=2022-09-14&currency=CAD&order_by=popularity")
    assert response.status_code == 200

# Tests the accommodation endpoint of the accommodation microservice with valid query parameters and optional query parameter of order_by contain review.
def test_accommodationValidQueriesOrderByReviewHotelInfoEndpoint():
    response = accommClient.get("/accom/api/v1/?location=berlin&no_of_adults=2&no_of_children=0&no_of_rooms=1&check_in=2022-09-12&checkout=2022-09-14&currency=CAD&order_by=review_score")
    assert response.status_code == 200

# Tests the accommodation endpoint of the accommodation microservice with valid query parameters and optional query parameter of order_by contain price.
def test_accommodationValidQueriesOrderByPriceHotelInfoEndpoint():
    response = accommClient.get("/accom/api/v1/?location=berlin&no_of_adults=2&no_of_children=0&no_of_rooms=1&check_in=2022-09-12&checkout=2022-09-14&currency=CAD&order_by=price")
    assert response.status_code == 200

# Tests the accommodation endpoint of the accommodation microservice with valid query parameters but invalid optional query parameter of order_by.
def test_accommodationValidQueriesOrderByInvalidTypeHotelInfoEndpoint():
    response = accommClient.get("/accom/api/v1/?location=berlin&no_of_adults=2&no_of_children=0&no_of_rooms=1&check_in=2022-09-12&checkout=2022-09-14&currency=CAD&order_by=invalid")
    assert response.status_code == 422

# Tests the accommodation endpoint of the accommodation microservice with valid query parameters but invalid location parameter.
def test_accommodationInvalidLocationQueryHotelInfoEndpoint():
    response = accommClient.get("/accom/api/v1/?location=nonexistent&no_of_adults=2&no_of_children=0&no_of_rooms=1&check_in=2022-09-12&checkout=2022-09-14&currency=CAD")
    assert response.status_code == 404

# Tests the accommodation endpoint of the accommodation microservice with valid query parameters but invalid currency parameter.
def test_accommodationInvalidCurrencyQueryHotelInfoEndpoint():
    response = accommClient.get("/accom/api/v1/?location=berlin&no_of_adults=2&no_of_children=0&no_of_rooms=1&check_in=2022-09-12&checkout=2022-09-14&currency=wrong")
    assert response.status_code == 404

# Tests the accommodation endpoint of the accommodation microservice with valid query parameters but invalid date parameter.
def test_accommodationInvalidDateQueryHotelInfoEndpoint():
    response = accommClient.get("/accom/api/v1/?location=berlin&no_of_adults=2&no_of_children=0&no_of_rooms=1&check_in=2022-09-&checkout=2022-09-14&currency=CAD")
    assert response.status_code == 422

# Tests the accommodation endpoint of the accommodation microservice with valid query parameters but invalid number of adults/children/rooms parameter.
def test_accommodationInvalidNumberOfQueryHotelInfoEndpoint():
    response = accommClient.get("/accom/api/v1/?location=berlin&no_of_adults=one&no_of_children=zero&no_of_rooms=one&check_in=2022-09-&checkout=2022-09-14&currency=CAD")
    assert response.status_code == 422

# Test the accommodation function getLocationID with valid parameters.
def test_accommodationFunctionLocationIDValidParameter():
    locationId = accommFunctions.getLocationID("calgary")
    assert locationId == "-561990"

# Test the accommodation function getLocationID with invalid parameters.
def test_accommodationFunctionLocationIDInvalidParameter():
    with pytest.raises(HTTPException) as err:
        accommFunctions.getLocationID("invalidlocation")
    assert err.value.status_code == 404

# Test the accommodation function getCurrencyExchange with valid parameters.
def test_accommodationFunctionCurrencyValidParameters():
    currencyExchange = accommFunctions.getCurrencyExchange("CAD", "EUR")
    assert currencyExchange == "0.72751325"

# Test the accommodation function getCurrencyExchange with valid parameters but the parameters are the same.
def test_accommodationFunctionSameCurrencyValidParameters():
    currencyExchange = accommFunctions.getCurrencyExchange("SAR", "SAR")
    assert currencyExchange == 1

# Test the accommodation function getCurrencyExchange with invalid parameters.
def test_accommodationFunctionCurrencyInvalidParameter():
    with pytest.raises(HTTPException) as err:
        accommFunctions.getCurrencyExchange("CAD", "P")
    assert err.value.status_code == 404