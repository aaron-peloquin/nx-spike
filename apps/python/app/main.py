from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from zoneinfo import ZoneInfo

app = FastAPI(title="experiment-nx Python Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/hello")
async def hello():
    """Return the current server time in ISO 8601 format (Central Time)."""
    now = datetime.now(ZoneInfo("America/Chicago")).isoformat()
    return {"time": now, "message": "Selly from FastAPI!"}


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "ok"}
