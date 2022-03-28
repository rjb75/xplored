from fastapi.testclient import TestClient
import testSetup, pytest

photoClient = TestClient(testSetup.photoApp)

# Tests the root endpoint of the photo gallery microservice.
def test_photoAppRootEndpoint():
    response = photoClient.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

# Tests the photo gallery microservice by passing through an invalid endpoint.
def test_photoAppInvalidEndpoint():
    response = photoClient.get("/test")
    assert response.status_code == 404

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

# Tests the photo endpoint of the photo gallery microservice with a valid query and valid dimensions.
def test_photoAppValidQueryValidDimensionsPhotoEndpoint():
    response = photoClient.get("/photo/api/v1/photo?name=paris&width=800&height=500")
    assert response.status_code == 200
    assert response.json() == {"photo_id": "DXuxHw3S5ak",
                               "photo_url": "https://source.unsplash.com/DXuxHw3S5ak/800x500"}

# Tests the photo endpoint of the photo gallery microservice with a valid query and invalid dimensions.
def test_photoAppValidQueryInvalidDimensionsPhotoEndpoint():
    response = photoClient.get("/photo/api/v1/photo?name=paris&width=two&height=five")
    assert response.status_code == 422

# Tests the photo endpoint of the photo gallery microservice with an invalid query and valid dimensions.
def test_photoAppInvalidQueryValidDimensionsPhotoEndpoint():
    response = photoClient.get("/photo/api/v1/photo?name=111111&width=800&height=500")
    assert response.status_code == 500

# Tests the photo endpoint of the photo gallery microservice with a valid query and valid photo type.
def test_photoAppValidQueryValidPhotoTypePhotoEndpoint():
    response = photoClient.get("/photo/api/v1/photo?name=paris&photoType=small")
    assert response.status_code == 200
    assert response.json() == {"photo_id": "DXuxHw3S5ak",
                               "photo_url": "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDY3MjF8MHwxfHNlYXJjaHwxfHxwYXJpc3xlbnwwfHx8fDE2NDg0MjEyNDQ&ixlib=rb-1.2.1&q=80&w=400"}

# Tests the photo endpoint of the photo gallery microservice with a valid query and invalid photo type.
def test_photoAppValidQueryInvalidPhotoTypePhotoEndpoint():
    response = photoClient.get("/photo/api/v1/photo?name=paris&photoType=invalidsize")
    assert response.status_code == 422

# Tests the photo endpoint of the photo gallery microservice with an invalid query and valid photo type.
def test_photoAppInvalidQueryValidPhotoTypePhotoEndpoint():
    response = photoClient.get("/photo/api/v1/photo?name=99999&photoType=small")
    assert response.status_code == 500

# Tests the random photo endpoint of the photo gallery microservice with a valid query.
def test_photoAppValidQueryRandomPhotoEndpoint():
    response = photoClient.get("/photo/api/v1/random?name=paris")
    assert response.status_code == 200

# Tests the random photo endpoint of the photo gallery microservice with an invalid query.
def test_photoAppInvalidQueryRandomPhotoEndpoint():
    response = photoClient.get("/photo/api/v1/random?name=5678")
    assert response.status_code == 500