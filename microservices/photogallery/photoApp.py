import config, uvicorn, os
from fastapi import FastAPI

photoApp = FastAPI()

#root endpoint
@photoApp.get("/")
def index():
    return {"message": "Hello World"}

#obtains one photo according to the photo name put
@photoApp.get("/photo/api/v1/{photo_name}")
def get_photo(photo_name):
    photos = config.api.search.photos(photo_name, per_page=1, page=1)['results']
    for photo in photos:
        return {"photo_id": photo.id,
            "photo_url": photo.urls.raw}

if __name__ == "__main__":
    uvicorn.run(photoApp, host=os.getenv("photo_host"), port=int(os.getenv("photo_port")))