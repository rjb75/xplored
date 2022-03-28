from enum import Enum

class OrderByTypeModel(str, Enum):
    popularity = "popularity"
    price = "price"
    review_score = "review_score"