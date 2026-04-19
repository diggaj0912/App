"""
Analytics data models
"""
from pydantic import BaseModel
from typing import Optional

class AnalyticsData(BaseModel):
    totalEvents: int
    totalCommunities: int
    totalUsers: int
    activeUsers: Optional[int] = 0
    
    class Config:
        json_schema_extra = {
            "example": {
                "totalEvents": 42,
                "totalCommunities": 8,
                "totalUsers": 156,
                "activeUsers": 45
            }
        }
