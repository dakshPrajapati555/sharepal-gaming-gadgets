from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database.session import Base, engine
from app.routes import api_router


@asynccontextmanager
async def lifespan(_app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="SharePal Gaming Gadgets API",
    version="1.0.0",
    description="REST API for the SharePal assignment catalog seeded from the supplied product-list JSON.",
    lifespan=lifespan,
)

origins = [origin.strip() for origin in settings.cors_origins.split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.get("/")
def root():
    return {
        "status": "ok",
        "service": "SharePal Gaming Gadgets API"
    }

print("REGISTERED ROUTES:")

for route in app.routes:
    print(route.path)
