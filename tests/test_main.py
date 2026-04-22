from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_read_main():
    response = client.get("/api")
    response_json = response.json()
    message = response_json.get("message")
    status = response_json.get("status")
    assert message == "Hello World"
    assert status == True
    assert response.status_code == 200
