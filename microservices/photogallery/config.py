from dotenv import load_dotenv
import os, requests

# loads env file
load_dotenv()
config = load_dotenv(".env")

# gets client ID from env file
client_id = os.getenv("PHOTO_CLIENT_ID")
# initializes url for sending GET requests to fastapi
photo_url = "https://api.unsplash.com/search/photos?client_id="+client_id
random_url = "https://api.unsplash.com/photos/random?client_id="+client_id
