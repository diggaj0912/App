from fastapi import Depends, HTTPException, Header
from firebaseAdmin import firebase_auth
from typing import Optional

async def verify_token(authorization: Optional[str] = Header(None)):
    """
    Middleware to verify Firebase ID token from Authorization header
    Usage: token = await verify_token(authorization=request.headers.get("authorization"))
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="No token provided")

    try:
        # Remove "Bearer " prefix if present
        token = authorization.replace("Bearer ", "") if authorization.startswith("Bearer ") else authorization
        
        # Verify the token
        decoded = firebase_auth.verify_id_token(token)
        return decoded
    except Exception as error:
        print(f"Token verification error: {error}")
        raise HTTPException(status_code=403, detail="Invalid or expired token")
