"""Stocks module."""

from datetime import date

import yfinance as yf


def get_dow30_data(start_date: date, end_date: date) -> dict:
    """Get Dow Jones 30 stock data for a given date range."""
    data = yf.download("^DJI", start=start_date, end=end_date, interval="1d")
    data = data["High"].to_dict()
    if not data:
        return {}
    return data
