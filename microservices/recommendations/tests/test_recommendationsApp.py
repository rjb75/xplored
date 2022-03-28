from fastapi.testclient import TestClient
import testSetup, pytest

recommendationClient = TestClient(testSetup.recommendationApp)

# Tests the root endpoint of the photo gallery microservice.
def test_recommendationClientRootEndpoint():
    response = recommendationClient.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}