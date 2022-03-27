from fastapi.testclient import TestClient
import testSetup, pytest

photoClient = TestClient(testSetup.photoApp)

# Tests the root endpoint of the photo gallery microservice.
def test_photoAppRootEndpoint():
    response = photoClient.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

# Tests the photo endpoint of the photo gallery microservice with a valid query.
def test_photoAppValidQueryPhotoEndpoint():
    response = photoClient.get("/photo/api/v1/photo?name=paris")
    assert response.status_code == 200
    assert response.json() == {"photo_id": "DXuxHw3S5ak",
                               "photo_url": "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMDY3MjF8MHwxfHNlYXJjaHwxfHxwYXJpc3xlbnwwfHx8fDE2NDg0MjEyNDQ&ixlib=rb-1.2.1&q=85"
                               }

# Tests the photo endpoint of the photo gallery microservice with an invalid query.
def test_photoAppInvalidQueryPhotoEndpoint():
    response = photoClient.get("/photo/api/v1/photo?name=12345")
    assert response.status_code == 500