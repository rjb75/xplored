from fastapi import HTTPException
import config

# The function getLocationID gets the location ID of the user-inputted location
# In the case the location does not exist, a 404 is raised.
def getLocationID(location):
    # create query string
    querystring = {"name":location,"locale":"en-gb"}
    # send GET request to booking api
    response = config.requests.request("GET", config.location_url, headers=config.headers, params=querystring)
    # stores response in a list
    responseList = response.json()
    # error handling for invalid location
    if not responseList:
        raise HTTPException(status_code=404, detail="Location not found")

    return response.json()[0]['dest_id']

# The function getCurrencyExchange gets the currency exchange of the user-inputted
# currency and the currency of the hotel.
# currency query should be the currency you want to convert
# from EUR to CAD, currency = EUR and originCurrency = CAD
def getCurrencyExchange(hotelCurrency, originCurrency):
    # returns 1 if both currency's are the same
    if(hotelCurrency == originCurrency):
        return 1
    else:
        # create query string
        querystring = {"currency":hotelCurrency, "locale": "en-gb"}
        # send GET request to booking api
        response = config.requests.request("GET", config.currency_change_url, headers=config.headers, params=querystring)
        # stores response from booking api
        currency_info = response.json()['exchange_rates']

        # gets currency exchange if user-inputted currency exists
        for currency in currency_info:
            if currency['currency'] == originCurrency:
                return currency['exchange_rate_buy']

    # error handling for invalid currency
    raise HTTPException(status_code=404, detail="Invalid Currency")