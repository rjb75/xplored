import config, uvicorn, os, requests
from fastapi import FastAPI

photoApp = FastAPI()

#root endpoint
@photoApp.get("/")
def index():
    return {"message": "Hello World"}

#photo types:
#raw, full, regular, small, thumb, small_s3

# The function get_photo queries unsplash api for pictures that relate to the user-inputted
# name query and returns an image url accordingly.
# The function takes in optional queries of dimensions (width, height) to return a url containing
# the image with the user-inputted dimensions.
# The function also takes in more optional queries for the photo type returned, the image can be
# returned in a photo type of 'raw', 'full', 'regular', 'small', 'thumb' or 'small_s3'.
@photoApp.get("/photo/api/v1/photo")
def get_photo(name: str, width: int | None = None, height: int | None = None, photoType: str | None = None):
    # create query for photo
    querystring = {"query":name,"page":"1", "per_page":"5"}
    # send GET request to unsplash api
    response = requests.request("GET", config.photo_url, params=querystring)
    # stores response from unsplash api in a dictionary
    results_dict = response.json()['results'][0]
    # stores the given urls
    urls_dict = results_dict['urls']
    # stores the given photo ID
    photo_id = results_dict['id']

    # returns photo url in given dimensions if width and height queries contain integers
    if None not in (width, height):
        photoUrl = "https://source.unsplash.com/{photo_ID}/{width}x{height}".format(photo_ID = str(photo_id), width = str(width), height = str(height))
        return {"photo_id" : photo_id,
                "photo_url" : photoUrl}
    # returns photo url of given photo type if photoType query contains a string
    elif photoType is not None:
        return {"photo_id": photo_id,
                "photo_url": urls_dict[photoType]}
    # returns a photo url of photo type 'full' if the optional queries contain nothing
    else:
        return {"photo_id": photo_id,
                "photo_url": urls_dict['full']}

# The function get_random_photo queries unsplash api for pictures that relate to the user-inputted
# name query and returns an image url accordingly. Each time the function is called a differnet
# url is returned so that the same photo is not returned each time.
@photoApp.get("/photo/api/v1/random")
def get_random_photo(name: str):
    # create query for photo
    querystring = {"query": name, "count": "1"}
    # send GET request to unsplash api
    response = requests.request("GET", config.random_url, params=querystring)
    # stores response from unsplash api in a dictionary
    random_dict = response.json()[0]

    #returns photo url
    return {"url": random_dict['urls']['full']}

if __name__ == "__main__":
    uvicorn.run(photoApp, host=os.getenv("PHOTO_HOST"), port=int(os.getenv("PHOTO_PORT")))