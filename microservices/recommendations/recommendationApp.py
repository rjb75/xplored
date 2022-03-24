from fastapi import FastAPI, HTTPException
import config
import model
import uvicorn, os

recommendationApp = FastAPI()

# Our root endpoint
@recommendationApp.get("/")
def index():
    return {"message": "Hello World"}

#returns recommendations about a location whether it be a city or a country.
@recommendationApp.get("/recom/api/v1/", response_description= "Getting recommendation about a Country", response_model=model.RecomendationModel)
async def get_location_recommendations(location_name: str):
    #for case insensitive search
    location = location_name.title()
    if (recommendation := config.db["recommendations"].find_one({"country": location})) is not None:
        return recommendation
    elif (recommendation := config.db["recommendations"].find_one({"city": location})) is not None:
        return recommendation
    else:
        raise HTTPException(status_code=404, detail="Location not found")



if __name__ == "__main__":
    uvicorn.run(recommendationApp, host=os.getenv("RECOMMENDATION_HOST"), port=int(os.getenv("RECOMMENDATION_PORT")))