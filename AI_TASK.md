# AI Task — SharePal Gaming Gadgets Assignment

Read this file, `PROGRESS.md`, and `README.md` before changing code.
Continue from the current state. Do not recreate completed work. Do not change the stack.

## Project objective

Recreate the SharePal Bangalore gaming-gadgets rental experience as a full-stack assignment that demonstrates **JavaScript, Python, React, REST API, and SQL**.

Reference: https://sharepal.in/bangalore/gaming-gadgets-on-rent

## Company requirements

```text
JavaScript
Python
React
REST API
SQL
```

## Technology stack

```text
React
JavaScript
Vite
Python
FastAPI
REST API
PostgreSQL
SQLAlchemy
React Router
CSS/Tailwind
Lucide
```

## Architecture

```text
React
  ↓
REST API
  ↓
FastAPI
  ↓
SQLAlchemy
  ↓
PostgreSQL
```

Do **not** replace this stack with Node/Express, MongoDB, MERN, Next.js, Firebase, or Supabase.

## Provided data

SharePal supplied `product-list.json.zip` at the repository root (also named `product-list.json (1).zip` in the brief).

The ZIP contains `product-list.json`. That file is the **source of truth** for the product catalog.

Inspected structure (23 products):

```text
{
  "products": [
    {
      "id": number,
      "name": string,
      "image": string (SharePal CDN URL),
      "rating": number,
      "booked_count": number,
      "tag": string ("", "Trending", "New", "Vote to Launch"),
      "per_day_rent": number,
      "out_of_stock": boolean
    }
  ]
}
```

There is **no** supplied description, originalPrice, discount, reviewCount, category, location, or rental-plan fields. Do not invent product rows. Derived fields (for example category from the product name) may be computed at seed time.

Import flow:

```text
product-list.json.zip
  → extracted copy at server/seed/product-list.json
  → Python seed script
  → SQLAlchemy
  → PostgreSQL
```

Keep the original ZIP unmodified.

## Features

- Product listing from the REST API (not a hardcoded catalog)
- Product details by id
- Search, filter (tag, availability, price, rating, derived category), sort, pagination
- Wishlist (localStorage; no auth)
- Rental date selection and estimated total from `per_day_rent`
- Bangalore location context
- SharePal-inspired UI (purple header, category rail, product cards, FAQ, reviews, footer)
- Loading / empty / error / not-found states
- Responsive layout including mobile nav

## Important constraints

- Do not switch the technology stack
- Do not replace PostgreSQL with MongoDB or SQLite as the application database
- Do not replace FastAPI with Express
- Do not invent product data when supplied data exists
- Do not over-engineer (no auth, payments, admin, Redux, Redis, K8s)
- Keep code maintainable
- Test before claiming completion

## Testing requirements

- Frontend: `npm install`, Vite dev server, production build
- Backend: venv, FastAPI startup, health + product endpoints
- Database: PostgreSQL connection, schema, seed, queries
- UI: listing → search → filter → sort → details → dates → wishlist
- Responsive and keyboard-accessible controls
- Production build of the client

## Deployment requirements

Document a reasonable split: static client (Vite `dist`) + FastAPI + managed PostgreSQL. Provide `.env.example` without secrets.
