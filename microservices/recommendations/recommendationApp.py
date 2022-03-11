from fastapi import FastAPI
import config, model, uvicorn, os

recommendationApp = FastAPI()

# Root endpoint
@recommendationApp.get("/")
def index():
    return {"message": "Hello World"}

#Gets recommendations for the given city if it exists
@recommendationApp.get("/recom/api/v1/{country_name}", response_description= "Getting recommendation about a Country", response_model=model.RecomendationModel)
async def get_country_recommendations(country_name: str):
    if (recommendation := config.db["recommendations"].find_one({"country": country_name})) is not None:
        return recommendation
    return

#Gets recommendations for the given country if it exists
@recommendationApp.get("/recom/api/v1/{country_name}/{city_name}", response_description= "Getting recommendation about a City", response_model=model.RecomendationModel)
async def get_city_recommendations(country_name:str, city_name: str):
    if (recommendation := config.db["recommendations"].find_one({"city": city_name})) is not None:
        return recommendation
    return


if __name__ == "__main__":
    uvicorn.run(recommendationApp, host=os.getenv("RECOMMENDATION_HOST"), port=int(os.getenv("RECOMMENDATION_PORT")))