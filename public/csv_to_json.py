import csv
import json

# -----------------------------
# CONFIG
# -----------------------------
CSV_FILE = "products.csv"        # Input CSV file
JSON_FILE = "products.json"      # Output JSON file

# -----------------------------
# Conversion
# -----------------------------
products = []

with open(CSV_FILE, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        # Convert tags column from comma-separated string to list
        tags = [tag.strip() for tag in row.get('tags', '').split(',') if tag.strip()]
        product = {
            "name": row.get("name", ""),
            # "description": row.get("description", ""),
            "url": row.get("url", ""),
            # "tags": tags
        }
        products.append(product)

# Save to JSON
with open(JSON_FILE, "w", encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print(f"[INFO] Converted {len(products)} products to {JSON_FILE}")
