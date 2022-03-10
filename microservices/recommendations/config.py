from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

mongodb_url = os.getenv("recommendation_mongodb_url")
port = int(os.getenv("recommendation_port"))

#sets up connection to MongoDB
client = MongoClient(mongodb_url, port)
db = client['user_recommendations']

