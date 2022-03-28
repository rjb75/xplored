from fastapi import HTTPException
import config

def getLocationID(location):
    querystring = {"name":location,"locale":"en-gb"}
    response = config.requests.request("GET", config.location_url, headers=config.headers, params=querystring)
    responseList = response.json()
    if not responseList:
        raise HTTPException(status_code=404, detail="Location not found")

    return response.json()[0]['dest_id']

def getCurrencyExchange(hotelCurrency, originCurrency):
    #currency query should be the currency you want to convert from
    #from EUR to CAD, currency = EUR and originCurrency = CAD
    if(hotelCurrency == originCurrency):
        return 1
    else:
        querystring = {"currency":hotelCurrency, "locale": "en-gb"}
        response = config.requests.request("GET", config.currency_change_url, headers=config.headers, params=querystring)
        currency_info = response.json()['exchange_rates']

        for currency in currency_info:
            if currency['currency'] == originCurrency:
                return currency['exchange_rate_buy']
    
    raise HTTPException(status_code=404, detail="Invalid Currency")