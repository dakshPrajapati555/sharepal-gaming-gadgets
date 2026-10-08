"""Load the supplied SharePal product-list JSON into PostgreSQL.

Usage (from the server directory, with DATABASE_URL set):

    python -m seed.import_products
"""

from __future__ import annotations

import json
import sys
from decimal import Decimal
from pathlib import Path

from sqlalchemy import func, select

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from app.database.session import SessionLocal, engine  # noqa: E402
from app.models.product import Product  # noqa: E402
from app.database.session import Base  # noqa: E402
from app.utils.category import derive_category  # noqa: E402

JSON_PATH = Path(__file__).with_name("product-list.json")


def load_source() -> list[dict]:
    payload = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    products = payload.get("products")
    if not isinstance(products, list):
        raise ValueError("product-list.json must contain a products array")
    return products


def upsert_products() -> int:
    Base.metadata.create_all(bind=engine)
    source = load_source()
    session = SessionLocal()
    try:
        for item in source:
            product = session.get(Product, item["id"])
            values = dict(
                name=item["name"],
                image_url=item["image"],
                rating=Decimal(str(item["rating"])),
                booked_count=int(item["booked_count"]),
                tag=item.get("tag") or "",
                per_day_rent=Decimal(str(item["per_day_rent"])),
                out_of_stock=bool(item["out_of_stock"]),
                category=derive_category(item["name"]),
            )
            if product is None:
                session.add(Product(id=item["id"], **values))
            else:
                for key, value in values.items():
                    setattr(product, key, value)
        session.commit()
        return session.scalar(select(func.count(Product.id))) or 0
    finally:
        session.close()


def main() -> None:
    count = upsert_products()
    print(f"Seeded {count} products from {JSON_PATH.name}")


if __name__ == "__main__":
    main()
