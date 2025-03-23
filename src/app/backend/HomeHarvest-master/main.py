from homeharvest import scrape_property
import json

def main():
    location = "Houston, TX"
    listing_type = ""  # for_sale, for_rent, pending
    if listing_type == "":  # or (for_sale, for_rent, pending)
        listing_type = "for_sale"  # default to for_sale
    else:
        listing_type = listing_type

    past_days = 30  # sold in last 30 days - listed in last 30 days if (for_sale, for_rent)
    mls_only = True  # only fetch MLS listings

    income = 100000  # ALTER BASED ON USER INCOME
    # Home buying criteria
    home_price_max = income * 5  # Aggressive estimate (5x income)
    # Renting criteria
    max_rent_affordable = income * 0.3 / 12  # 30% of monthly income
    budget = max_rent_affordable if listing_type == "for_rent" else home_price_max

    #House details with checking
    bed = "3"
    if bed == "":
        bed = "1"
    bath = "2"
    if bath == "":
        bath = "1"
    stories = "1"
    if stories == "":
        stories = "1"
    



    filename = "HomeHarvest.json"

    properties = scrape_property(
        location=location,
        listing_type=listing_type,
        past_days=past_days,
        mls_only=mls_only,
        limit=200,
    )

    properties.to_json(filename, index=False)
    
    with open(filename, "r") as readfile:
        data = json.load(readfile)

    try:
        if not data:
            print("No data found")
        else:
            filtered_data = {}
            
            for i in range(7):
                while(data['list_price'][str(i)] < budget): #change Based on rent or buy either max_rent_affordable or home_price_max
                    i += 1
                    property_details = {
                        "property_id": data['property_id'][str(i)],
                        "list_price": data['list_price'][str(i)],
                        "sqft": data['sqft'][str(i)],
                        "street": data['street'][str(i)],
                        "zip_code": data['zip_code'][str(i)],
                        "city": data['city'][str(i)],
                        "state": data['state'][str(i)],
                        "style": data['style'][str(i)],
                        "beds": data['beds'][str(i)],
                        "full_baths": data['full_baths'][str(i)],
                        "half_baths": data['half_baths'][str(i)],
                        "stories": data['stories'][str(i)],
                        "parking_garage": data['parking_garage'][str(i)],
                        "nearby_schools": data['nearby_schools'][str(i)],
                        "agent_name": data['agent_name'][str(i)],
                        "agent_email": data['agent_email'][str(i)],
                        "primary_photo": data['primary_photo'][str(i)]
                    }
                    filtered_data[f"Property {i}"] = property_details
                    print(json.dumps({f"Property {i}": property_details}, indent=4))
                    print("-" * 50)
                
            with open("sample.json", "w") as outfile:
                json.dump(filtered_data, outfile, indent=4)
                
    except ValueError:
        print("Invalid JSON")

if __name__ == "__main__":
    main()
