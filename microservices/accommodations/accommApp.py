from fastapi import FastAPI
from dotenv import load_dotenv
import config, uvicorn, os, datetime, accommFunctions

accommodationApp = FastAPI()

# Our root endpoint
@accommodationApp.get("/")
def index():
    return {"message": "Hello World"}

#price by default
# endpoint to return hotel information

#return
#currency of choice to return
#long/lat
#total price
#image
#address
#url

#order_by options are 
@accommodationApp.get("/accom/api/v1/")
def getHotelInfo(location: str, number_of_adults: int, number_of_children: int, check_in_date: datetime.date, 
number_of_rooms: int, checkout_date: datetime.date, currency: str, order_by: str | None = None):

    hotel_list = []
    location_id = accommFunctions.getLocationID(location)

    if order_by is None and number_of_children > 0:
        hotel_search_query = {"dest_id": location_id, "units": "metric", "order_by": "price", "adults_number": number_of_adults, "checkin_date": check_in_date, 
    "locale": "en-gb", "dest_type": "city", "filter_by_currency": "AED", "room_number": number_of_rooms, "checkout_date": checkout_date, 
    "page_number":"0","include_adjacency":"true", "children_number":number_of_children}
    elif order_by is None and number_of_children == 0:
        hotel_search_query = {"dest_id": location_id, "units": "metric", "order_by": "price", "adults_number": number_of_adults, "checkin_date": check_in_date, 
    "locale": "en-gb", "dest_type": "city", "filter_by_currency": "AED", "room_number": number_of_rooms, "checkout_date": checkout_date, 
    "page_number":"0","include_adjacency":"true"}
    elif order_by is not None and number_of_children == 0:
        hotel_search_query = {"dest_id": location_id, "units": "metric", "order_by": order_by, "adults_number": number_of_adults, "checkin_date": check_in_date, 
    "locale": "en-gb", "dest_type": "city", "filter_by_currency": "AED", "room_number": number_of_rooms, "checkout_date": checkout_date, 
    "page_number":"0","include_adjacency":"true"}
    else:
        hotel_search_query = {"dest_id": location_id, "units": "metric", "order_by": order_by, "adults_number": number_of_adults, "checkin_date": check_in_date, 
    "locale": "en-gb", "dest_type": "city", "filter_by_currency": "AED", "room_number": number_of_rooms, "checkout_date": checkout_date, 
    "page_number":"0","include_adjacency":"true", "children_number":number_of_children}

    hotel_response = config.requests.request("GET", config.hotel_info_url, headers=config.headers, params=hotel_search_query)
    hotel_information = hotel_response.json()['result']

    for hotel in hotel_information: 
        hotel_list.append({"hotel_information": hotel['unit_configuration_label'], "hotel_longitude": hotel['longitude'], "hotel_latitude": hotel['latitude'], 
        "hotel_price": float(hotel['min_total_price']) * float(accommFunctions.getCurrencyExchange(hotel['currency_code'], currency)),
        "hotel_image": hotel['main_photo_url'], "hotel_address": hotel['address'], "hotel_url": hotel['url']})

    return {"hotel_information": hotel_list}


if __name__ == "__main__":
    uvicorn.run(accommodationApp, host=os.getenv("ACCOMMODATION_HOST"), port=int(os.getenv("ACCOMMODATION_PORT")))