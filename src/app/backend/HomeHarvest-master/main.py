from homeharvest import scrape_property
import json

def main():
    location = "Baton Rouge, LA"
    listing_type = "for_sale"  # or (for_sale, for_rent, pending)
    past_days = 30  # sold in last 30 days - listed in last 30 days if (for_sale, for_rent)
    mls_only = True  # only fetch MLS listings

    filename = "HomeHarvest.json"

    properties = scrape_property(
        location=location,
        listing_type=listing_type,
        past_days=past_days,
        mls_only=mls_only,
        limit=5
    )

    properties.to_json(filename, index=False)

    READFILE = open(filename, "r")
    data = json.load(READFILE)

    try:
        if not data:
            print("No data found")
        else:
            for i in range(5):
                print(f"Price first: {data['list_price'][str(i)]}")
                print(f"Sqft first: {data['sqft'][str(i)]}")
                print(f"Street first: {data['street'][str(i)]}")
                print(f"City first: {data['city'][str(i)]}")
                print(f"State first: {data['state'][str(i)]}")
                print(f"Zipcode first: {data['zip_code'][str(i)]}")
                print(f"Style first: {data['style'][str(i)]}")
                print(f"Beds first: {data['beds'][str(i)]}")
                print(f"Full Baths first: {data['full_baths'][str(i)]}")
                print(f"Half Baths first: {data['half_baths'][str(i)]}")
                print(f"Stories first: {data['stories'][str(i)]}")
                print(f"Garage first: {data['parking_garage'][str(i)]}")
                print(f"Nearby Schools first: {data['nearby_schools'][str(i)]}")
                print(f"Agent Name first: {data['agent_name'][str(i)]}")
                print(f"Agent Email first: {data['agent_email'][str(i)]}")
                #mobile_number = next((phone['number'] for phone in data['agent_phones'][str(i)] if phone['type'] == 'Mobile'), "Not Found")
                #print(f"Agent Phone first: {mobile_number}")
    except ValueError:
        print("Invalid JSON")

if __name__ == "__main__":
    main()