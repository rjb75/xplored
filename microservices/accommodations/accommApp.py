from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
import config, uvicorn, os, datetime, accommFunctions, accommModel

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
def getHotelInfo(location: str, no_of_adults: int, no_of_children: int, no_of_rooms: int,
 check_in: datetime.date, checkout: datetime.date, currency: str, order_by: accommModel.OrderByTypeModel | None = None):

    hotel_list = []
    location_id = accommFunctions.getLocationID(location)

    today_date = datetime.date.today()
    no_of_days = checkout - check_in

    if check_in < today_date or checkout < today_date or no_of_days.days < 0:
        raise HTTPException(status_code=404, detail="Invalid Date")

    if order_by is None and no_of_children > 0:
        hotel_search_query = {"dest_id": location_id, "units": "metric", "order_by": "price", "adults_number": no_of_adults, "checkin_date": check_in, 
    "locale": "en-gb", "dest_type": "city", "filter_by_currency": "AED", "room_number": no_of_rooms, "checkout_date": checkout, 
    "page_number":"0","include_adjacency":"true", "children_number":no_of_children}
    elif order_by is None and no_of_children == 0:
        hotel_search_query = {"dest_id": location_id, "units": "metric", "order_by": "price", "adults_number": no_of_adults, "checkin_date": check_in, 
    "locale": "en-gb", "dest_type": "city", "filter_by_currency": "AED", "room_number": no_of_rooms, "checkout_date": checkout, 
    "page_number":"0","include_adjacency":"true"}
    elif order_by is not None and no_of_children == 0:
        hotel_search_query = {"dest_id": location_id, "units": "metric", "order_by": order_by.value, "adults_number": no_of_adults, "checkin_date": check_in, 
    "locale": "en-gb", "dest_type": "city", "filter_by_currency": "AED", "room_number": no_of_rooms, "checkout_date": checkout, 
    "page_number":"0","include_adjacency":"true"}
    else:
        hotel_search_query = {"dest_id": location_id, "units": "metric", "order_by": order_by.value, "adults_number": no_of_adults, "checkin_date": check_in, 
    "locale": "en-gb", "dest_type": "city", "filter_by_currency": "AED", "room_number": no_of_rooms, "checkout_date": checkout, 
    "page_number":"0","include_adjacency":"true", "children_number":no_of_children}

    hotel_response = config.requests.request("GET", config.hotel_info_url, headers=config.headers, params=hotel_search_query)
    hotel_information = hotel_response.json()['result']
    exchange = accommFunctions.getCurrencyExchange(hotel_response.json()['result'][0]['currency_code'], currency)

    for hotel in hotel_information: 
        hotel_list.append({"hotel_name": hotel['hotel_name'], "hotel_information": hotel['unit_configuration_label'], "hotel_longitude": hotel['longitude'], "hotel_latitude": hotel['latitude'], 
        "hotel_price": (float(hotel['min_total_price']) * float(exchange))/no_of_days.days,
        "hotel_image": hotel['max_photo_url'], "hotel_address": hotel['address'], "hotel_url": hotel['url']})

    return {"hotel_information": hotel_list}


if __name__ == "__main__":
    uvicorn.run(accommodationApp, host=os.getenv("ACCOMMODATION_HOST"), port=int(os.getenv("ACCOMMODATION_PORT")))