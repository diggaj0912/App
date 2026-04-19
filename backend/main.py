from fastapi import FastAPI, Depends, HTTPException, Header, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from middleware.auth import verify_token
from middleware.admin import is_admin, set_admin, remove_admin, ADMIN_USERS
from websocket_manager import manager
from typing import Dict, Any, Optional
from datetime import datetime

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (use MongoDB in production)
users = {}  # {email: {email, name, role}}
events = []  # [{id, title, owner, ...}]
notifications = []  # [{id, user, message, read, createdAt}]
event_counter = 0
notification_counter = 0

# Models
class Event(BaseModel):
    title: str
    description: Optional[str] = None

class User(BaseModel):
    email: str
    name: str

class UserResponse(BaseModel):
    email: str
    name: str
    role: str

class Notification(BaseModel):
    user: str
    message: str
    read: bool = False

class NotificationUpdate(BaseModel):
    read: bool

class AnalyticsData(BaseModel):
    totalEvents: int
    totalCommunities: int
    totalUsers: int
    activeUsers: int = 0

# Routes - Public
@app.get("/")
def read_root():
    return {"message": "Backend is running"}

# Routes - Protected (User must be logged in)
@app.post("/create-event")
async def create_event(event: Event, user: Dict[str, Any] = Depends(verify_token)):
    """Create event (authenticated users only)"""
    global event_counter
    event_counter += 1
    
    new_event = {
        "id": event_counter,
        "title": event.title,
        "description": event.description,
        "owner": user.get("email"),
    }
    events.append(new_event)
    return {"message": "Event created", "event": new_event}

@app.get("/events/{user_email}")
async def get_events(user_email: str, user: Dict[str, Any] = Depends(verify_token)):
    """Get events for a specific user (authenticated users only)"""
    user_events = [e for e in events if e["owner"] == user_email]
    return {"events": user_events}

@app.get("/my-events")
async def get_my_events(user: Dict[str, Any] = Depends(verify_token)):
    """Get current user's events"""
    user_email = user.get("email")
    user_events = [e for e in events if e["owner"] == user_email]
    return {"events": user_events}

@app.post("/save-user")
async def save_user(user_data: User, user: Dict[str, Any] = Depends(verify_token)):
    """Save user profile (auto-called after signup/login)"""
    email = user.get("email")
    users[email] = {
        "email": email,
        "name": user_data.name,
        "role": "user"  # Default role
    }
    return {"message": "User saved", "user": users[email]}

@app.get("/user-role")
async def get_user_role(user: Dict[str, Any] = Depends(verify_token)):
    """Get current user's role"""
    email = user.get("email")
    
    # Check if user in database
    if email in users:
        return {"email": email, "role": users[email]["role"]}
    
    # Check in admin list (fallback)
    if email in ADMIN_USERS:
        return {"email": email, "role": "admin"}
    
    return {"email": email, "role": "user"}

# Routes - Admin Only
@app.get("/admin/users")
async def get_all_users(user: Dict[str, Any] = Depends(is_admin)):
    """Get all users (admin only)"""
    return {"users": list(users.values())}

@app.get("/admin/events")
async def get_all_events(user: Dict[str, Any] = Depends(is_admin)):
    """Get all events (admin only)"""
    return {"events": events}

@app.post("/admin/make-admin/{email}")
async def make_admin(email: str, user: Dict[str, Any] = Depends(is_admin)):
    """Make user admin (admin only)"""
    if email in users:
        users[email]["role"] = "admin"
        set_admin(email)
        return {"message": f"{email} is now admin", "user": users[email]}
    
    raise HTTPException(status_code=404, detail="User not found")

@app.post("/admin/remove-admin/{email}")
async def remove_user_admin(email: str, user: Dict[str, Any] = Depends(is_admin)):
    """Remove admin role from user (admin only)"""
    if email in users:
        users[email]["role"] = "user"
        remove_admin(email)
        return {"message": f"{email} is no longer admin", "user": users[email]}
    
    raise HTTPException(status_code=404, detail="User not found")

@app.delete("/admin/users/{email}")
async def delete_user(email: str, user: Dict[str, Any] = Depends(is_admin)):
    """Delete user (admin only)"""
    if email in users:
        del users[email]
        remove_admin(email)
        return {"message": f"User {email} deleted"}
    
    raise HTTPException(status_code=404, detail="User not found")

# ============================================================================
# NOTIFICATIONS ROUTES
# ============================================================================

@app.post("/notify")
async def create_notification(notification: Notification, user: Dict[str, Any] = Depends(verify_token)):
    """Create a notification (protected route)"""
    global notification_counter
    notification_counter += 1
    
    new_notification = {
        "id": notification_counter,
        "user": notification.user,
        "message": notification.message,
        "read": notification.read,
        "createdAt": datetime.now().isoformat()
    }
    notifications.append(new_notification)
    
    # Send real-time notification via WebSocket
    await manager.send_personal({
        "type": "new-notification",
        "data": new_notification
    }, notification.user)
    
    return {"message": "Notification created", "notification": new_notification}

@app.get("/notifications/{user_email}")
async def get_user_notifications(user_email: str, user: Dict[str, Any] = Depends(verify_token)):
    """Get all notifications for a user"""
    user_notifications = [n for n in notifications if n["user"] == user_email]
    return {"notifications": user_notifications}

@app.post("/notifications/{notification_id}/read")
async def mark_notification_read(notification_id: int, user: Dict[str, Any] = Depends(verify_token)):
    """Mark notification as read"""
    for notif in notifications:
        if notif["id"] == notification_id:
            notif["read"] = True
            return {"message": "Notification marked as read", "notification": notif}
    
    raise HTTPException(status_code=404, detail="Notification not found")

@app.delete("/notifications/{notification_id}")
async def delete_notification(notification_id: int, user: Dict[str, Any] = Depends(verify_token)):
    """Delete a notification"""
    global notifications
    for i, notif in enumerate(notifications):
        if notif["id"] == notification_id:
            deleted = notifications.pop(i)
            return {"message": "Notification deleted", "notification": deleted}
    
    raise HTTPException(status_code=404, detail="Notification not found")

# WebSocket endpoint for real-time notifications
@app.websocket("/ws/notifications/{user_email}")
async def websocket_notifications(websocket: WebSocket, user_email: str):
    """WebSocket endpoint for receiving real-time notifications"""
    await manager.connect(websocket, user_email)
    try:
        while True:
            # Keep connection alive and receive messages
            data = await websocket.receive_text()
            # Echo back for keep-alive
    except WebSocketDisconnect:
        manager.disconnect(user_email, websocket)
    except Exception as e:
        print(f"WebSocket error: {e}")
        manager.disconnect(user_email, websocket)

# ============================================================================
# ANALYTICS ROUTES
# ============================================================================

@app.get("/analytics")
async def get_analytics(user: Dict[str, Any] = Depends(verify_token)):
    """Get analytics data (protected route)"""
    # Basic analytics
    total_events = len(events)
    total_users = len(users)
    
    # Count communities (for now, estimate based on events)
    # In a real app, you'd have a communities collection
    communities = len(set(e.get("owner") for e in events))
    
    analytics = {
        "totalEvents": total_events,
        "totalCommunities": communities,
        "totalUsers": total_users,
        "activeUsers": len(users),
        "lastUpdated": datetime.now().isoformat()
    }
    
    return analytics

@app.get("/analytics/admin")
async def get_admin_analytics(user: Dict[str, Any] = Depends(is_admin)):
    """Get detailed analytics (admin only)"""
    # Detailed analytics for admin
    total_events = len(events)
    total_users = len(users)
    communities = len(set(e.get("owner") for e in events))
    
    # Count notifications
    total_notifications = len(notifications)
    unread_notifications = len([n for n in notifications if not n["read"]])
    
    # Events per user
    events_per_user = {}
    for event in events:
        owner = event.get("owner")
        events_per_user[owner] = events_per_user.get(owner, 0) + 1
    
    analytics = {
        "totalEvents": total_events,
        "totalCommunities": communities,
        "totalUsers": total_users,
        "activeUsers": len(users),
        "totalNotifications": total_notifications,
        "unreadNotifications": unread_notifications,
        "eventsPerUser": events_per_user,
        "recentEvents": events[-5:] if events else [],
        "recentNotifications": notifications[-5:] if notifications else [],
        "lastUpdated": datetime.now().isoformat()
    }
    
    return analytics
