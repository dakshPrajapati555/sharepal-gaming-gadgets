from decimal import Decimal
from math import ceil

from sqlalchemy import Select, func, or_, select
from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product import CategoryCount, FilterMeta, ProductListResponse, ProductOut

ALLOWED_SORT = {
    "relevance",
    "price_asc",
    "price_desc",
    "rating",
    "popular",
}


def _apply_filters(
    stmt: Select,
    search: str | None,
    category: str | None,
    tag: str | None,
    in_stock: bool | None,
    min_price: Decimal | None,
    max_price: Decimal | None,
    min_rating: Decimal | None,
) -> Select:
    if search:
        pattern = f"%{search.strip()}%"
        stmt = stmt.where(
            or_(
                Product.name.ilike(pattern),
                Product.tag.ilike(pattern),
                Product.category.ilike(pattern),
            )
        )
    if category:
        stmt = stmt.where(Product.category == category)
    if tag:
        stmt = stmt.where(Product.tag == tag)
    if in_stock is True:
        stmt = stmt.where(Product.out_of_stock.is_(False))
    elif in_stock is False:
        stmt = stmt.where(Product.out_of_stock.is_(True))
    if min_price is not None:
        stmt = stmt.where(Product.per_day_rent >= min_price)
    if max_price is not None:
        stmt = stmt.where(Product.per_day_rent <= max_price)
    if min_rating is not None:
        stmt = stmt.where(Product.rating >= min_rating)
    return stmt


def _apply_sort(stmt: Select, sort: str) -> Select:
    if sort == "price_asc":
        return stmt.order_by(Product.per_day_rent.asc(), Product.id.asc())
    if sort == "price_desc":
        return stmt.order_by(Product.per_day_rent.desc(), Product.id.asc())
    if sort == "rating":
        return stmt.order_by(Product.rating.desc(), Product.booked_count.desc())
    if sort == "popular":
        return stmt.order_by(Product.booked_count.desc(), Product.id.asc())
    return stmt.order_by(Product.booked_count.desc(), Product.rating.desc(), Product.id.asc())


def list_products(
    db: Session,
    search: str | None = None,
    category: str | None = None,
    tag: str | None = None,
    in_stock: bool | None = None,
    min_price: Decimal | None = None,
    max_price: Decimal | None = None,
    min_rating: Decimal | None = None,
    sort: str = "relevance",
    page: int = 1,
    limit: int = 12,
) -> ProductListResponse:
    if sort not in ALLOWED_SORT:
        sort = "relevance"
    page = max(page, 1)
    limit = min(max(limit, 1), 48)

    filters = dict(
        search=search,
        category=category,
        tag=tag,
        in_stock=in_stock,
        min_price=min_price,
        max_price=max_price,
        min_rating=min_rating,
    )
    count_stmt = _apply_filters(select(func.count(Product.id)), **filters)
    total = db.scalar(count_stmt) or 0

    stmt = _apply_sort(_apply_filters(select(Product), **filters), sort)
    stmt = stmt.offset((page - 1) * limit).limit(limit)
    rows = db.scalars(stmt).all()

    return ProductListResponse(
        items=[ProductOut.model_validate(row) for row in rows],
        total=total,
        page=page,
        limit=limit,
        total_pages=ceil(total / limit) if total else 0,
    )


def get_product(db: Session, product_id: int) -> Product | None:
    return db.get(Product, product_id)


def get_filter_meta(db: Session) -> FilterMeta:
    category_rows = db.execute(
        select(Product.category, func.count(Product.id))
        .group_by(Product.category)
        .order_by(Product.category)
    ).all()
    tags = [
        tag
        for tag in db.scalars(
            select(Product.tag).where(Product.tag != "").distinct().order_by(Product.tag)
        ).all()
    ]
    min_price = db.scalar(select(func.min(Product.per_day_rent))) or Decimal("0")
    max_price = db.scalar(select(func.max(Product.per_day_rent))) or Decimal("0")
    return FilterMeta(
        categories=[CategoryCount(name=name, count=count) for name, count in category_rows],
        tags=tags,
        min_price=min_price,
        max_price=max_price,
    )
