import config, uvicorn, os
from fastapi import FastAPI

photoApp = FastAPI()

#root endpoint
@photoApp.get("/")
def index():
    return {"message": "Hello World"}
    
#photo types:
#raw, full, regular, small, thumb, small_s3
#obtains one photo according to the photo name and takes in an optional query for photo size
#takes in optional query for photo height and width as well
@photoApp.get("/photo/api/v1/{photo_name}")
def get_photo(photo_name, width: int | None = None, height: int | None = None, photoType: str | None = None):
    photos = config.api.search.photos(photo_name, per_page=1, page=1)['results']
    for photo in photos:
        if None not in (width, height):
            photoUrl = "https://source.unsplash.com/{photo_ID}/{width}x{height}".format(photo_ID = str(photo.id), width = str(width), height = str(height))
            return {"photo_id" : photo.id, 
                    "photo_url" : photoUrl}    
        elif(photoType == "raw"):
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