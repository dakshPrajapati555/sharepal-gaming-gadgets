from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.product import FilterMeta, ProductListResponse, ProductOut
from app.services import product_service

router = APIRouter(tags=["products"])


@router.get("/products", response_model=ProductListResponse)
def list_products(
    search: str | None = Query(default=None, description="Search name, tag, or category"),
    category: str | None = Query(default=None),
    tag: str | None = Query(default=None),
    in_stock: bool | None = Query(default=None),
    min_price: Decimal | None = Query(default=None, ge=0),
    max_price: Decimal | None = Query(default=None, ge=0),
    min_rating: Decimal | None = Query(default=None, ge=0, le=5),
    sort: str = Query(default="relevance"),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=12, ge=1, le=48),
    db: Session = Depends(get_db),
) -> ProductListResponse:
    return product_service.list_products(
        db,
        search=search,
        category=category,
        tag=tag,
        in_stock=in_stock,
        min_price=min_price,
        max_price=max_price,
        min_rating=min_rating,
        sort=sort,
        page=page,
        limit=limit,
    )


@router.get("/products/meta", response_model=FilterMeta)
def product_meta(db: Session = Depends(get_db)) -> FilterMeta:
    return product_service.get_filter_meta(db)


@router.get("/products/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)) -> ProductOut:
    product = product_service.get_product(db, product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return ProductOut.model_validate(product)
