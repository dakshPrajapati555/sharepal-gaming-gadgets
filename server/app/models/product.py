from decimal import Decimal

from sqlalchemy import Boolean, Index, Integer, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database.session import Base


class Product(Base):
    __tablename__ = "products"
    __table_args__ = (
        Index("ix_products_category", "category"),
        Index("ix_products_tag", "tag"),
        Index("ix_products_per_day_rent", "per_day_rent"),
        Index("ix_products_rating", "rating"),
        Index("ix_products_out_of_stock", "out_of_stock"),
        Index("ix_products_name", "name"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    image_url: Mapped[str] = mapped_column(Text, nullable=False)
    rating: Mapped[Decimal] = mapped_column(Numeric(3, 1), nullable=False, default=0)
    booked_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    tag: Mapped[str] = mapped_column(String(64), nullable=False, default="")
    per_day_rent: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    out_of_stock: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    category: Mapped[str] = mapped_column(String(64), nullable=False)
