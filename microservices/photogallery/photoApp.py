import config, uvicorn, os
from fastapi import FastAPI

photoApp = FastAPI()

#root endpoint
@photoApp.get("/")
def index():
    return {"message": "Hello World"}
    
#photo types:
# raw, full, regular, small, thumb, small_s3
#obtains one photo according to the photo name and takes in an optional query for photo size
@photoApp.get("/photo/api/v1/{photo_name}")
def get_photo(photo_name, photoType: str | None = None):
    photos = config.api.search.photos(photo_name, per_page=1, page=1)['results']
    for photo in photos:    
        if(photoType == "raw"):
            return {"photo_id": photo.id,
                    "photo_url": photo.urls.raw}
        elif(photoType == "full"):
            return {"photo_id": photo.id,
                    "photo_url": photo.urls.full}
        elif(photoType == "regular"):
            return {"photo_id": photo.id,
                    "photo_url": photo.urls.regular}
        elif(photoType == "small"):
            return {"photo_id": photo.id,
                    "photo_url": photo.urls.small}
        elif(photoType == "thumb"):
            return {"photo_id": photo.id,
                    "photo_url": photo.urls.thumb}
        elif(photoType == "small_s3"):
            return {"photo_id": photo.id,
                    "photo_url": photo.urls.small_s3}
        else:
            return {"photo_id": photo.id,
                    "photo_url": photo.urls.full}

if __name__ == "__main__":
    uvicorn.run(photoApp, host=os.getenv("PHOTO_HOST"), port=int(os.getenv("PHOTO_PORT")))