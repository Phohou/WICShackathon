from homeharvest import scrape_property
from datetime import datetime

location="San Diego, CA"
listing_type="for_sale" # or (for_sale, for_rent, pending)
past_days=30  # sold in last 30 days - listed in last 30 days if (for_sale, for_rent)
mls_only=True  # only fetch MLS listings

filename = f"HomeHarvest.csv"

properties = scrape_property(
    location=location,
    listing_type=listing_type,
    past_days=past_days,
    mls_only=mls_only,
  
)
print(f"Number of properties: {len(properties)}")

# Export to csv
properties.to_json(filename, index=False)
print(properties.head())