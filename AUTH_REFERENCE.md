# Firebase Authentication & Admin System - Quick Reference

## 🚀 What's Been Implemented

### ✅ Frontend (React + TypeScript)
- **Firebase Authentication** with email/password
- **Token Management** - automatically saved and refreshed
- **Protected Routes** - redirects unauthenticated users to login
- **Auth Listener** - monitors logged-in state and token refresh
- **API Utility** - `fetchWithAuth()` for authenticated requests

### ✅ Backend (Python FastAPI)
- **Firebase Admin SDK** - verifies ID tokens
- **Auth Middleware** - validates token on each request
- **Admin Middleware** - checks user role for admin routes
- **Protected Endpoints** - only authenticated users can access
- **Admin Endpoints** - only admins can manage users

### ✅ Pages Created
- `/login` - Login with Firebase
- `/signup` - Register with Firebase
- `/admin` - Admin panel to manage users and roles

---

## 📁 File Structure

### Frontend Files
```
src/
├── firebase.ts                  # Firebase config (uses env variables)
├── utils/api.ts                 # fetchWithAuth() utility
├── App.tsx                       # Main app with auth listener & routes
├── ProtectedRoute.tsx            # Route protection wrapper
└── pages/
    ├── Login.tsx                # Save token after login
    ├── Signup.tsx               # Save token after signup
    ├── CreateEvent.tsx          # Example of using fetchWithAuth
    └── Admin.tsx                # Admin panel for user management
```

### Backend Files
```
backend/
├── main.py                       # FastAPI app with routes
├── firebaseAdmin.py             # Firebase Admin initialization
├── serviceAccountKey.json       # (Download from Firebase) ⚠️
└── middleware/
    ├── auth.py                  # Token verification
    └── admin.py                 # Admin role checking
```

---

## 🔐 How Authentication Works

### Flow:
1. **User Signs Up/Logs In** → Firebase generates ID token
2. **Token Saved** → `localStorage.authToken`
3. **Frontend Sends Token** → Every API request includes `Authorization` header
4. **Backend Verifies Token** → Uses Firebase Admin SDK
5. **Token Refreshed** → Every 55 minutes automatically

---

## 🛠 How to Use Authenticated APIs

### Option 1: Use the fetchWithAuth Utility
```typescript
import { fetchWithAuth } from "./utils/api";

// GET request
const response = await fetchWithAuth("http://localhost:8000/my-events");
const data = await response.json();

// POST request
const response = await fetchWithAuth("http://localhost:8000/create-event", {
  method: "POST",
  body: JSON.stringify({ title: "My Event" }),
});
```

### Option 2: Manual Token Fetch
```typescript
import { getAuthToken } from "./utils/api";

const token = await getAuthToken();
const response = await fetch("http://localhost:8000/my-events", {
  headers: { Authorization: token },
});
```

### Option 3: Get Token from Current User
```typescript
import { auth } from "./firebase";

const token = await auth.currentUser?.getIdToken();
localStorage.setItem("authToken", token);
```

---

## 👥 User Roles System

### Two Roles:
- **user** - Default role for all new users
- **admin** - Can manage users and view admin panel

### Setting Admin Role:

#### Method 1: Code (Temporary)
```python
# In backend/main.py during startup
from middleware.admin import set_admin
set_admin("your-email@gmail.com")
```

#### Method 2: Admin API Endpoint
```python
# Add this route to main.py
@app.post("/admin/setup")
async def admin_setup():
    email = "your-email@gmail.com"
    set_admin(email)
    if email in users:
        users[email]["role"] = "admin"
    return {"message": f"{email} is now admin"}
```

Then call: `POST http://localhost:8000/admin/setup`

#### Method 3: Admin Panel
Once you're admin, use `/admin` page to promote other users.

---

## 🔗 API Endpoints

### Public Routes
- `GET /` - Health check
- `POST /login` - ❌ Not used (Firebase handles this)
- `POST /signup` - ❌ Not used (Firebase handles this)

### Protected Routes (Auth Required)
```
POST   /create-event              # Create event
GET    /my-events                 # Get your events  
GET    /events/{email}            # Get events by user
POST   /save-user                 # Save user profile
GET    /user-role                 # Get your role
```

### Admin Routes (Auth + Admin Role Required)
```
GET    /admin/users               # List all users
GET    /admin/events              # List all events
POST   /admin/make-admin/{email}  # Promote user to admin
POST   /admin/remove-admin/{email}# Demote user from admin
DELETE /admin/users/{email}       # Delete user
```

---

## 🧪 Testing the System

### 1. Test Login/Signup
```bash
1. Go to http://localhost:3000/signup
2. Create account with email/password
3. Token should be saved to localStorage
4. Should redirect to dashboard
```

### 2. Test Token Verification
```bash
# Open DevTools Console and run:
const token = localStorage.getItem("authToken");
console.log("Token:", token);

# Call backend with token:
fetch("http://localhost:8000/user-role", {
  headers: { Authorization: token }
}).then(r => r.json()).then(console.log);
```

### 3. Test Event Creation
```typescript
import { fetchWithAuth } from "./utils/api";

const response = await fetchWithAuth("http://localhost:8000/create-event", {
  method: "POST",
  body: JSON.stringify({ title: "Test Event" }),
});

const event = await response.json();
console.log("Created event:", event);
```

### 4. Test Admin Features
1. Make yourself admin (see "Setting Admin Role" above)
2. Go to `http://localhost:3000/admin`
3. Should see list of users
4. Can make/remove admins and delete users

---

## 🐛 Common Errors & Solutions

### "No token provided" (401)
- User is not logged in
- Session expired - need to re-login
- **Fix**: Check `localStorage.authToken` exists

### "Invalid token" (403)
- Token is expired (lasts 60 minutes)
- Token is corrupted
- **Fix**: Clear localStorage and re-login
```javascript
localStorage.removeItem("authToken");
localStorage.removeItem("user");
// Redirect to login
```

### "Admin access required" (403)
- User is not an admin
- **Fix**: Make user admin using setup endpoint

### Backend not running (ECONNREFUSED)
- Backend server is not started
- **Fix**: `python main.py` in `backend/` folder

### Token not being sent
- `fetchWithAuth` is not being used
- Authorization header not in request
- **Fix**: Use `fetchWithAuth` utility or manually add header

---

## 📊 Token Expiry & Refresh

### Token Lifespan: 60 minutes
- Firebase generates 60-minute tokens
- App auto-refreshes at 55 minutes
- No user action needed

### Manual Token Refresh:
```typescript
import { getAuthToken } from "./utils/api";

// Get fresh token anytime
const newToken = await getAuthToken();
```

---

## 🚨 Security Notes

### ✅ Good Practices
- Keys stored in `.env` (never committed)
- `serviceAccountKey.json` in `.gitignore`
- Tokens verified server-side
- Admin routes protected by middleware
- Sensitive data stored on backend

### ⚠️ Before Production
- Set up MongoDB instead of in-memory storage
- Add CORS restrictions
- Use HTTPS only
- Add rate limiting
- Add input validation
- Set Firebase security rules in console
- Use environment-specific keys

---

## 🎯 Next Steps

1. ✅ Install Firebase Admin SDK (done)
2. ✅ Create auth middleware (done)
3. ✅ Update frontend with tokens (done)
4. 📋 Download `serviceAccountKey.json` from Firebase
5. 📋 Place in `backend/` folder
6. 📋 Start backend: `python main.py`
7. 📋 Start frontend: `npm run dev`
8. 📋 Test authentication flow
9. 📋 Set yourself as admin
10. 📋 Access admin panel

---

## 📚 References

- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Firebase ID Token](https://firebase.google.com/docs/auth/admin-setup#verify_id_tokens)
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)
- [Firebase Console](https://console.firebase.google.com)
