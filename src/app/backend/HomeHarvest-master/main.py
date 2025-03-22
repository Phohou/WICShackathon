from homeharvest import scrape_property
from datetime import datetime
import json

location = "San Diego, CA"
listing_type = "for_sale"  # or (for_sale, for_rent, pending)
past_days = 30  # sold in last 30 days - listed in last 30 days if (for_sale, for_rent)
mls_only = True  # only fetch MLS listings

filename = "HomeHarvest.json"

properties = scrape_property(
    location=location,
    listing_type=listing_type,
    past_days=past_days,
    mls_only=mls_only,
    limit=5,
)

properties.to_json(filename, index=False)

READFILE = open(filename, "r")
data = json.load(READFILE)

print(f"Price first: {data['list_price']['0']}")
print(f"Sqft first: {data['sqft']['0']}")
print(f"Street first: {data['street']['0']}")
print(f"City first: {data['city']['0']}")
print(f"State first: {data['state']['0']}")
print(f"Zipcode first: {data['zip_code']['0']}")
print(f"Style first: {data['style']['0']}")
print(f"Beds first: {data['beds']['0']}")
print(f"Full Baths first: {data['full_baths']['0']}")
print(f"Half Baths first: {data['half_baths']['0']}")
print(f"Stories first: {data['stories']['0']}")
print(f"Garage first: {data['parking_garage']['0']}")
print(f"Nearby Schools first: {data['nearby_schools']['0']}")
print(f"Agent Name first: {data['agent_name']['0']}")
print(f"Agent Email first: {data['agent_email']['0']}")
mobile_number = next((phone['number'] for phone in data['agent_phones']['0'] if phone['type'] == 'Mobile'), "Not Found")
print(f"Agent Phone first: {mobile_number}")


