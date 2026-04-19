"""
Notification Model for MongoDB
"""
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Notification(BaseModel):
    user: str  # User email
    message: str
    read: bool = False
    createdAt: Optional[datetime] = None

    class Config:
        json_schema_extra = {
            "example": {
                "user": "user@example.com",
                "message": "New event created",
                "read": False,
                "createdAt": "2026-04-19T12:00:00"
            }
        }

class NotificationUpdate(BaseModel):
    read: bool
