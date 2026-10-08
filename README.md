# SharePal Gaming Gadgets — Full-Stack Assignment

A recreation of the [SharePal Bangalore gaming-gadgets rental page](https://sharepal.in/bangalore/gaming-gadgets-on-rent) built to demonstrate **JavaScript, Python, React, REST API, and SQL**.

This is an assignment recreation, not the official SharePal product.

## Features

- Product listing and details loaded from a FastAPI REST API
- Search, category, tag, stock, rating, and price filters
- Sorting (relevance, booked count, price, rating)
- Pagination
- Wishlist persisted in `localStorage` (no auth)
- Delivery / pickup date picker and rental estimate from `per_day_rent`
- Bangalore location context
- SharePal-inspired layout: purple header, category rail, cards, FAQ, reviews, footer, mobile nav
- Loading, empty, error, and invalid-product states

## Tech stack

- JavaScript
- React (Vite)
- React Router
- CSS (SharePal-inspired, no generic template)
- Lucide React
- Python
- FastAPI REST API
- PostgreSQL
- SQLAlchemy

## Architecture

```text
React
  ↓
FastAPI REST API
  ↓
SQLAlchemy
  ↓
PostgreSQL
```

The frontend does **not** hardcode the catalog. Cards come from `GET /api/products`.

## Data

SharePal supplied `product-list.json.zip` at the repo root.

The ZIP contains `product-list.json` with **23 products**. Actual fields:

- `id`
- `name`
- `image` (SharePal CDN URL)
- `rating`
- `booked_count`
- `tag`
- `per_day_rent`
- `out_of_stock`

The original ZIP is left unchanged. A copy is stored at `server/seed/product-list.json` for the import script.

`category` is **derived at seed time** from the product name because the JSON has no category field. No extra products are invented.

## Setup

### 1. PostgreSQL

Create a database and user, then copy environment variables:

```bash
cp .env.example .env
```

Example:

```text
DATABASE_URL=postgresql+psycopg://sharepal:sharepal@localhost:5432/sharepal
```

```sql
CREATE USER sharepal WITH PASSWORD 'sharepal';
CREATE DATABASE sharepal OWNER sharepal;
```

If a system PostgreSQL install is not available, this repo can start a local PostgreSQL 18 cluster (still PostgreSQL, not SQLite) on port `54329`:

```bash
cd server
python scripts/start_local_postgres.py
```

Then set:

```text
DATABASE_URL=postgresql+psycopg://postgres@127.0.0.1:54329/sharepal
```

### 2. Backend

```bash
cd server
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python -m seed.import_products
uvicorn app.main:app --reload --port 8000
```

Run the seed from the `server` directory so `app` is on `PYTHONPATH`.

### 3. Frontend

```bash
cd client
npm install
npm run dev
```

Vite proxies `/api` to `http://127.0.0.1:8000` in development.

Open http://localhost:5173

### 4. Production frontend build

```bash
cd client
npm run build
```

Set `VITE_API_BASE_URL` to the public API origin before building if the UI is not served behind the same host.

## API

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/api/health` | Database ping |
| GET | `/api/products` | List with filters |
| GET | `/api/products/meta` | Categories, tags, price range |
| GET | `/api/products/{id}` | Single product (`404` if missing) |

Query parameters for `GET /api/products`:

- `search`
- `category`
- `tag`
- `in_stock`
- `min_price` / `max_price`
- `min_rating`
- `sort` = `relevance` \| `price_asc` \| `price_desc` \| `rating` \| `popular`
- `page` / `limit`

## Deployment

Reasonable split for this assignment:

1. Managed PostgreSQL
2. FastAPI on a Python host (Render, Railway, Fly, or a VM)
3. Vite `dist/` on static hosting, with `VITE_API_BASE_URL` pointing at the API

Do not ship real credentials. Use platform env vars.

## Known limitations

- Catalog is only the 23 supplied products (live SharePal also lists Xbox, VR, and other gadgets).
- No login, payments, or real checkout.
- Rental totals are `per_day_rent × days`; the JSON has no tenure-specific price table.
- Wishlist is local to the browser.
