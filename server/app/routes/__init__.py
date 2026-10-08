from fastapi import APIRouter

from app.routes.health import router as health_router
from app.routes.products import router as products_router

api_router = APIRouter(prefix="/api")
api_router.include_router(health_router)
api_router.include_router(products_router)
