from unsplash.api import Api
from unsplash.auth import Auth
from dotenv import load_dotenv
import os

load_dotenv()
config = load_dotenv(".env")

client_id = os.getenv("PHOTO_CLIENT_ID")
client_secret = os.getenv("PHOTO_CLIENT_SECRET")
redirect_uri = os.getenv("PHOTO_DIRECT_URI")
code = ""

#connecting to unsplash api
auth = Auth(client_id, client_secret, redirect_uri, code=code)
api = Api(auth)



