from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    image_url: str
    rating: Decimal
    booked_count: int
    tag: str
    per_day_rent: Decimal
    out_of_stock: bool
    category: str


class ProductListResponse(BaseModel):
    items: list[ProductOut]
    total: int
    page: int
    limit: int
    total_pages: int


class CategoryCount(BaseModel):
    name: str
    count: int = Field(ge=0)


class FilterMeta(BaseModel):
    categories: list[CategoryCount]
    tags: list[str]
    min_price: Decimal
    max_price: Decimal
