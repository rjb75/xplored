import config, uvicorn, os, requests
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
@photoApp.get("/photo/api/v1/photo")
def get_photo(name: str, width: int | None = None, height: int | None = None, photoType: str | None = None):
    #create query for photo
    querystring = {"query":name,"page":"1", "per_page":"5"}
    #send GET request to unsplash api
    response = requests.request("GET", config.photo_url, params=querystring)

    results_dict = response.json()['results'][0]
    urls_dict = results_dict['urls']

    photo_id = results_dict['id']

    if None not in (width, height):
        photoUrl = "https://source.unsplash.com/{photo_ID}/{width}x{height}".format(photo_ID = str(photo_id), width = str(width), height = str(height))
        return {"photo_id" : photo_id,
                "photo_url" : photoUrl}
    elif photoType is not None:
        return {"photo_id": photo_id,
                "photo_url": urls_dict[photoType]}
    else:
        return {"photo_id": photo_id,
                "photo_url": urls_dict['full']}

@photoApp.get("/photo/api/v1/random")
def get_random_photo(name: str):
    querystring = {"query": name, "count": "1"}
    response = requests.request("GET", config.random_url, params=querystring)
    random_dict = response.json()[0]

    return {"url": random_dict['urls']['full']}

if __name__ == "__main__":
    uvicorn.run(photoApp, host=os.getenv("PHOTO_HOST"), port=int(os.getenv("PHOTO_PORT")))