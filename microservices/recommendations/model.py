from pydantic import BaseModel, Field
from bson import ObjectId

#Converts ObjectId to a String
class PyObjectId(ObjectId):

    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

#Model for the structure of the recommendation stored in the MongoDB database
class RecomendationModel(BaseModel):
    _id: Field(default_factory=PyObjectId, alias="_id")
    city: str = Field(...)
    country: str = Field(...)
    details: list = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {

            "example": {
                "city": "Paris",
                "country": "France",
                "details": ["recommendation details...", "more recommendaton details..."]
            }

        }

