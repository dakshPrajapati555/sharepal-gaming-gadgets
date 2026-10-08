from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env", "../.env"),
        extra="ignore",
    )

    database_url: str = "postgresql+psycopg://sharepal:sharepal@localhost:5432/sharepal"
    port: int = 8000
    api_base_url: str = "http://localhost:8000"
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"


settings = Settings()
