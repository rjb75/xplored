from unsplash.api import Api
from unsplash.auth import Auth
from dotenv import load_dotenv
import os

load_dotenv()
config = load_dotenv(".env")

client_id = os.getenv("photo_client_id")
client_secret = os.getenv("photo_client_secret")
redirect_uri = os.getenv("photo_redirect_uri")
code = ""

#connecting to unsplash api
auth = Auth(client_id, client_secret, redirect_uri, code=code)
api = Api(auth)



