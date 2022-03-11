from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

mongodb_url = os.getenv("RECOMMENDATION_MONGODB_URL")
port = int(os.getenv("RECOMMENDATION_PORT"))

#sets up connection to MongoDB
client = MongoClient(mongodb_url, port)
db = client['user_recommendations']

