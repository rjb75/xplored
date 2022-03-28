from fastapi.testclient import TestClient
import testSetup, pytest

accommClient = TestClient(testSetup.accommodationApp)

# Tests the root endpoint of the accommodation microservice.
def test_accommodationRootEndpoint():
    response = accommClient.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}