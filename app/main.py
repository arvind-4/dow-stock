"""Main module."""

from datetime import date
from typing import Annotated

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from app.stocks import get_dow30_data

app = FastAPI()

origins = ["*"]

MAX_RANGE_DAYS = 365

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api")
async def index() -> dict:
    """Return a JSON response with a message."""
    return {"message": "Hello World", "status": True, "data": {}}


@app.get("/api/stocks")
def get_stocks(
    start: Annotated[date, Query()],
    end: Annotated[date, Query()],
) -> dict:
    """Get Dow Jones 30 stock data for a given date range."""
    if start > end:
        raise HTTPException(400, "start date must be before end date")
    if (end - start).days > MAX_RANGE_DAYS:
        raise HTTPException(400, f"Date range cannot exceed {MAX_RANGE_DAYS} days")

    data = get_dow30_data(start_date=start, end_date=end)

    if not data:
        return {
            "message": "Data not found",
            "status": False,
            "data": {},
        }

    return {
        "message": "Data retrieved successfully",
        "status": True,
        "data": data,
    }
