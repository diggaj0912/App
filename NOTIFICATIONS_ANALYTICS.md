# Notifications & Analytics System

## 📋 Overview

This document covers two major features:
1. **Real-time Notifications** - Send notifications to users with WebSocket support
2. **Analytics Dashboard** - View platform statistics and usage metrics

---

## 🔔 NOTIFICATIONS SYSTEM

### Architecture

```
User A creates event
     ↓
Backend creates notification & broadcasts
     ↓
WebSocket delivers to User B in real-time
     ↓
Notification Bell shows unread count
```

### Backend Endpoints

#### Create Notification
```
POST /notify

Request:
{
  "user": "user@example.com",
  "message": "New event created by John",
  "read": false
}

Response:
{
  "message": "Notification created",
  "notification": {
    "id": 1,
    "user": "user@example.com",
    "message": "New event created",
    "read": false,
    "createdAt": "2026-04-19T12:00:00"
  }
}
```

#### Get User Notifications
```
GET /notifications/{user_email}

Response:
{
  "notifications": [
    {
      "id": 1,
      "user": "user@example.com",
      "message": "New event created",
      "read": false,
      "createdAt": "2026-04-19T12:00:00"
    }
  ]
}
```

#### Mark as Read
```
POST /notifications/{notification_id}/read

Response:
{
  "message": "Notification marked as read",
  "notification": { ... }
}
```

#### Delete Notification
```
DELETE /notifications/{notification_id}

Response:
{
  "message": "Notification deleted",
  "notification": { ... }
}
```

#### WebSocket Real-time Updates
```
WebSocket Connection:
ws://localhost:8000/ws/notifications/{user_email}

Message Received:
{
  "type": "new-notification",
  "data": {
    "id": 1,
    "user": "user@example.com",
    "message": "New event created",
    "read": false,
    "createdAt": "2026-04-19T12:00:00"
  }
}
```

### Frontend Components

#### NotificationBell Component
```typescript
import NotificationBell from "../components/NotificationBell";

// Add to your navbar/header
<NotificationBell />
```

**Features:**
- Shows unread notification count
- Real-time updates via WebSocket
- Click dropdown to view notifications
- Mark notifications as read
- Delete notifications
- Relative time display (e.g., "2m ago")

### Usage Examples

#### Send Notification to User
```python
# Backend (main.py)
from fastapi import WebSocket

new_notification = {
    "id": notification_counter,
    "user": "user@example.com",
    "message": "You have a new event invite",
    "read": False,
    "createdAt": datetime.now().isoformat()
}

# Broadcast to specific user
await manager.send_personal({
    "type": "new-notification",
    "data": new_notification
}, "user@example.com")
```

#### Fetch Notifications (Frontend)
```typescript
import { fetchWithAuth } from "../utils/api";

const response = await fetchWithAuth(
  "http://localhost:8000/notifications/user@example.com"
);
const data = await response.json();
console.log(data.notifications);
```

#### WebSocket Connection (Frontend)
```typescript
// Handled automatically by NotificationBell component
const ws = new WebSocket("ws://localhost:8000/ws/notifications/user@example.com");

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === "new-notification") {
    console.log("New notification:", data.data);
    // Update UI automatically
  }
};
```

---

## 📊 ANALYTICS DASHBOARD

### Architecture

```
Users create events
     ↓
Backend tracks statistics
     ↓
Analytics API aggregates data
     ↓
Frontend renders charts & metrics
```

### Backend Endpoints

#### Get Analytics (User)
```
GET /analytics

Response:
{
  "totalEvents": 42,
  "totalCommunities": 8,
  "totalUsers": 156,
  "activeUsers": 45,
  "lastUpdated": "2026-04-19T12:00:00"
}
```

#### Get Analytics (Admin)
```
GET /analytics/admin

Response:
{
  "totalEvents": 42,
  "totalCommunities": 8,
  "totalUsers": 156,
  "activeUsers": 45,
  "totalNotifications": 320,
  "unreadNotifications": 12,
  "eventsPerUser": {
    "user1@example.com": 5,
    "user2@example.com": 3
  },
  "recentEvents": [ ... ],
  "recentNotifications": [ ... ],
  "lastUpdated": "2026-04-19T12:00:00"
}
```

### Frontend Components

#### Analytics Dashboard Page
```typescript
import Analytics from "../pages/Analytics";

// Add route to App.tsx
<Route
  path="/analytics"
  element={
    <ProtectedRoute>
      <Analytics />
    </ProtectedRoute>
  }
/>
```

**Features:**
- Real-time metric cards (Events, Communities, Users, Active Users)
- Bar chart showing overview
- Pie chart showing distribution
- Engagement rate calculation
- Events per community metric
- Auto-refresh every 30 seconds
- Manual refresh button

### Charts Library

Uses **Recharts** for beautiful, responsive charts:
- Bar charts for comparisons
- Pie charts for distribution
- Tooltips for data details
- Responsive design

### Usage Examples

#### Fetch Analytics (Frontend)
```typescript
import { fetchWithAuth } from "../utils/api";

const response = await fetchWithAuth("http://localhost:8000/analytics");
const analytics = await response.json();

console.log(`Total Events: ${analytics.totalEvents}`);
console.log(`Active Users: ${analytics.activeUsers}`);
console.log(`Engagement: ${(analytics.activeUsers / analytics.totalUsers * 100).toFixed(2)}%`);
```

#### Add Analytics Widget
```typescript
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/api";

function AnalyticsWidget() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchWithAuth("http://localhost:8000/analytics")
      .then(r => r.json())
      .then(setStats);
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg">
        <p>Events: {stats.totalEvents}</p>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <p>Communities: {stats.totalCommunities}</p>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <p>Users: {stats.totalUsers}</p>
      </div>
    </div>
  );
}
```

---

## 🔧 Integration Guide

### Step 1: Add Navbar with Notifications
```typescript
// src/pages/Dashboard.tsx
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        {/* Your dashboard content */}
      </div>
    </>
  );
}
```

### Step 2: Trigger Notifications When Events Created
```python
# backend/main.py
@app.post("/create-event")
async def create_event(event: Event, user: Dict[str, Any] = Depends(verify_token)):
    # Create event
    new_event = { ... }
    events.append(new_event)
    
    # Notify all users about new event
    other_users = [u for u in users.keys() if u != user.get("email")]
    for user_email in other_users:
        notification = {
            "id": notification_counter,
            "user": user_email,
            "message": f"New event '{new_event['title']}' created by {user.get('email')}",
            "read": False,
            "createdAt": datetime.now().isoformat()
        }
        notifications.append(notification)
        await manager.send_personal({
            "type": "new-notification",
            "data": notification
        }, user_email)
    
    return {"message": "Event created", "event": new_event}
```

### Step 3: Add Analytics Link to Navbar
Already included in the Navbar component with the Analytics button.

---

## 📈 Metrics Explained

### Total Events
- Total number of events in the system
- Updated in real-time

### Total Communities
- Number of unique communities (derived from event owners)
- Indicates platform diversity

### Total Users
- Total registered users
- Should grow over time

### Active Users
- Currently online/active users
- Indicates engagement

### Engagement Rate
- `(activeUsers / totalUsers) * 100`
- Shows what % of users are actively using the platform

### Events per Community
- `totalEvents / totalCommunities`
- Average event density per community

---

## 🔒 Security

### Notifications
- Only authenticated users can create/read notifications
- Users can only see their own notifications
- WebSocket requires user email validation

### Analytics
- Basic analytics viewable by all authenticated users
- Admin analytics `/analytics/admin` only for admins
- No sensitive user data exposed

---

## 📦 Dependencies

```json
{
  "recharts": "^2.x.x"  // For charts
}
```

Install with:
```bash
npm install recharts
```

---

## 🚀 Future Enhancements

### Notifications
- [ ] Email notifications
- [ ] Push notifications
- [ ] Notification priorities (urgent, normal, low)
- [ ] Notification scheduling
- [ ] User notification preferences
- [ ] Batch notifications

### Analytics
- [ ] Trends over time (line charts)
- [ ] User growth graph
- [ ] Event creation timeline
- [ ] Peak usage hours
- [ ] Geographic distribution
- [ ] Custom date ranges
- [ ] Export reports (PDF, CSV)
- [ ] Real-time dashboard updates

---

## 🐛 Troubleshooting

### Notifications Not Appearing
1. Check WebSocket connection: `ws://localhost:8000/ws/notifications/...`
2. Verify user email matches
3. Check browser console for errors
4. Ensure backend is running

### WebSocket Connection Failed
- Make sure backend is running on port 8000
- Check firewall settings
- Try refreshing the page
- Check CORS settings

### Analytics Not Loading
1. Verify `/analytics` endpoint is working
2. Check authentication token
3. Ensure at least one event/user exists
4. Check browser console for errors

### Charts Not Rendering
1. Ensure recharts is installed
2. Check console for library errors
3. Verify data is being fetched
4. Try clearing cache and refreshing

---

## 📝 API Reference

All endpoints require authentication (except public routes).

### Notifications
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /notify | ✅ | Create notification |
| GET | /notifications/{email} | ✅ | Get user notifications |
| POST | /notifications/{id}/read | ✅ | Mark as read |
| DELETE | /notifications/{id} | ✅ | Delete notification |
| WS | /ws/notifications/{email} | ✅ | WebSocket connection |

### Analytics
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /analytics | ✅ | Get user analytics |
| GET | /analytics/admin | ✅ Admin | Get admin analytics |

---

## 💡 Best Practices

1. **Notifications:**
   - Keep messages short and actionable
   - Use consistent message format
   - Bundle related notifications
   - Clean up old notifications

2. **Analytics:**
   - Monitor engagement metrics regularly
   - Alert on anomalies
   - Share insights with team
   - Use for decision making

3. **Performance:**
   - Paginate notifications (load more on scroll)
   - Cache analytics data
   - Limit notifications retention (e.g., 30 days)
   - Optimize WebSocket reconnection

