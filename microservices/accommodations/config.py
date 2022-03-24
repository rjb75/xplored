from dotenv import load_dotenv
import os, requests

load_dotenv()
config = load_dotenv(".env")

accomm_api_key = os.getenv("ACCOMMODATION_API_KEY")

headers = {
	"X-RapidAPI-Host": "booking-com.p.rapidapi.com",
	"X-RapidAPI-Key": accomm_api_key
}

location_url = "https://booking-com.p.rapidapi.com/v1/hotels/locations"
hotel_info_url = "https://booking-com.p.rapidapi.com/v1/hotels/search"
currency_change_url = "https://booking-com.p.rapidapi.com/v1/metadata/exchange-rates"