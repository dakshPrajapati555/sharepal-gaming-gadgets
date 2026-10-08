-- PostgreSQL schema matching the SQLAlchemy Product model.
-- Applied automatically via Base.metadata.create_all on API startup / seed.

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    rating NUMERIC(3, 1) NOT NULL DEFAULT 0,
    booked_count INTEGER NOT NULL DEFAULT 0,
    tag VARCHAR(64) NOT NULL DEFAULT '',
    per_day_rent NUMERIC(10, 2) NOT NULL,
    out_of_stock BOOLEAN NOT NULL DEFAULT FALSE,
    category VARCHAR(64) NOT NULL
);

CREATE INDEX IF NOT EXISTS ix_products_category ON products (category);
CREATE INDEX IF NOT EXISTS ix_products_tag ON products (tag);
CREATE INDEX IF NOT EXISTS ix_products_per_day_rent ON products (per_day_rent);
CREATE INDEX IF NOT EXISTS ix_products_rating ON products (rating);
CREATE INDEX IF NOT EXISTS ix_products_out_of_stock ON products (out_of_stock);
CREATE INDEX IF NOT EXISTS ix_products_name ON products (name);
