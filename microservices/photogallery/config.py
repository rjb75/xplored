from dotenv import load_dotenv
import os, requests

load_dotenv()
config = load_dotenv(".env")

client_id = os.getenv("PHOTO_CLIENT_ID")
photo_url = "https://api.unsplash.com/search/photos?client_id="+client_id
