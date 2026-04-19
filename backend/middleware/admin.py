from fastapi import Depends, HTTPException
from middleware.auth import verify_token
from typing import Dict, Any

# For now, we'll use hard-coded admin list
# In production, store this in MongoDB
ADMIN_USERS = set()

def set_admin(email: str):
    """Add an email to admin list"""
    ADMIN_USERS.add(email)

def remove_admin(email: str):
    """Remove an email from admin list"""
    ADMIN_USERS.discard(email)

async def is_admin(user: Dict[str, Any] = Depends(verify_token)):
    """
    Middleware to check if user is admin
    Usage:
    @app.get("/admin/endpoint")
    async def admin_endpoint(user=Depends(is_admin)):
    """
    user_email = user.get("email")
    
    if user_email not in ADMIN_USERS:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    return user
