from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_list_products():
    response = client.get("/api/products", params={"limit": 12})
    assert response.status_code == 200
    body = response.json()
    assert "items" in body
    assert body["total"] >= 1
    assert body["items"][0]["name"]
    assert "per_day_rent" in body["items"][0]


def test_search_playstation():
    response = client.get("/api/products", params={"search": "playstation"})
    assert response.status_code == 200
    names = [item["name"].lower() for item in response.json()["items"]]
    assert any("playstation" in name for name in names)


def test_product_not_found():
    response = client.get("/api/products/999999")
    assert response.status_code == 404
