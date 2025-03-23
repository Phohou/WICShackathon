import requests

city = "Austin"
state = "TX"
bedrooms = 3
bathrooms = 2
limit = 5

def get_homes():
    url = f"https://api.rentcast.io/v1/properties?city={city}&state={state}&bedrooms={bedrooms}&bathrooms={bathrooms}&limit={limit}"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
        else:
            print("Error: Unable to retrieve data")
    except requests.exceptions.RequestException:
        print("An error occurred while connecting to the API")
        data = None