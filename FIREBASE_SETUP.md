# Firebase Admin & Authentication Setup Guide

## Step 1: Get Firebase Service Account Key ✅

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Project Settings** (gear icon)
4. Click **Service Accounts** tab
5. Click **Generate New Private Key**
6. Save the JSON file as `backend/serviceAccountKey.json`

⚠️ **IMPORTANT**: Never commit this file to git. It's in .gitignore by default.

---

## Step 2: Backend Setup ✅

The backend is already configured with:
- ✅ `firebaseAdmin.py` - Firebase Admin initialization
- ✅ `middleware/auth.py` - Token verification middleware
- ✅ `middleware/admin.py` - Admin role checking
- ✅ Updated `main.py` with protected routes

### Protected Routes:
- `POST /create-event` - Create event (auth required)
- `GET /my-events` - Get your events (auth required)
- `POST /save-user` - Save user profile (auth required)
- `GET /user-role` - Get user role (auth required)

### Admin Routes:
- `GET /admin/users` - List all users (admin only)
- `GET /admin/events` - List all events (admin only)
- `POST /admin/make-admin/{email}` - Make user admin (admin only)
- `POST /admin/remove-admin/{email}` - Remove admin role (admin only)
- `DELETE /admin/users/{email}` - Delete user (admin only)

---

## Step 3: Frontend Setup ✅

The frontend is already configured with:
- ✅ Firebase authentication in `src/firebase.ts`
- ✅ Auth listener in `App.tsx` with token refresh
- ✅ Login page that saves tokens
- ✅ Signup page that saves tokens
- ✅ API utility `src/utils/api.ts` for authenticated requests
- ✅ Admin page at `src/pages/Admin.tsx`

### How Token Flow Works:
1. User signs up/logs in → Firebase generates ID token
2. Token saved to `localStorage.authToken`
3. Token refreshed every 55 minutes automatically
4. All API requests include token in `Authorization` header
5. Backend verifies token before processing request

---

## Step 4: First-Time Run

### Backend:
```bash
cd backend
python main.py
# Server runs on http://localhost:8000
```

### Frontend:
```bash
npm run dev
# App runs on http://localhost:3000
```

### Test Flow:
1. Sign up at `/signup`
2. Login at `/login`
3. Create event at `/create-event`
4. Admin will be unable to access until set as admin

---

## Step 5: Make Yourself Admin

Once you've created a user account:

### Option A: Edit Backend Code (Temporary)
In `backend/main.py`, during initialization, add:
```python
from middleware.admin import set_admin
set_admin("your-email@gmail.com")  # Add this to app startup
```

### Option B: Add Admin Endpoint (Recommended)
Create a one-time setup route:
```python
@app.post("/admin/setup")
async def admin_setup():
    email = "your-email@gmail.com"
    set_admin(email)
    if email in users:
        users[email]["role"] = "admin"
    return {"message": f"{email} is now admin"}
```

Then call: `POST http://localhost:8000/admin/setup`

---

## Step 6: Use Admin Panel

Once you're an admin:
1. Go to `/admin` in the app
2. View all users
3. Promote/demote users
4. Delete users
5. Manage roles

---

## API Request Examples

### Get User Role:
```javascript
const token = localStorage.getItem("authToken");
const response = await fetch("http://localhost:8000/user-role", {
  headers: { Authorization: token }
});
```

### Create Event (with token):
```javascript
const token = localStorage.getItem("authToken");
const response = await fetch("http://localhost:8000/create-event", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
  body: JSON.stringify({ title: "My Event" }),
});
```

### Or use the built-in utility:
```javascript
import { fetchWithAuth } from "./utils/api";

const response = await fetchWithAuth("http://localhost:8000/user-role");
const data = await response.json();
console.log(data.role);
```

---

## Frontend Component Usage

### Check if Admin in Component:
```jsx
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/api";

export default function MyComponent() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchWithAuth("http://localhost:8000/user-role")
      .then(res => res.json())
      .then(data => setIsAdmin(data.role === "admin"));
  }, []);

  return (
    <>
      {isAdmin && <Link to="/admin">Admin Panel</Link>}
    </>
  );
}
```

---

## File Structure

```
backend/
├── main.py                      # FastAPI app with routes
├── firebaseAdmin.py             # Firebase Admin initialization
├── serviceAccountKey.json       # (Download from Firebase) ⚠️ Don't commit!
└── middleware/
    ├── auth.py                  # Token verification
    └── admin.py                 # Admin role checking

src/
├── firebase.ts                  # Firebase client config
├── App.tsx                      # Main app with routes & token refresh
├── ProtectedRoute.tsx           # Route protection
├── utils/
│   └── api.ts                   # Authenticated fetch utility
└── pages/
    ├── Login.tsx                # Saves token after login
    ├── Signup.tsx               # Saves token after signup
    └── Admin.tsx                # Admin panel
```

---

## Troubleshooting

### "No token provided" error
- Make sure to save token after login: `localStorage.setItem("authToken", token)`
- Check that frontend is sending `Authorization` header

### "Invalid token" error
- Token may be expired. Try logging out and logging back in
- Make sure `serviceAccountKey.json` is in backend folder
- Verify Firebase credentials in firebaseAdmin.py are correct

### Admin routes return 403
- User is not in admin list
- Use the setup endpoint to make user admin
- Verify email matches exactly

### Backend not starting
- Check Python version: `python --version`
- Install dependencies: `pip install firebase-admin pymongo fastapi`
- Check port 8000 is not in use

---

## Next Steps

1. ✅ Download `serviceAccountKey.json` from Firebase
2. ✅ Place it in `backend/` folder
3. ✅ Start backend: `python main.py`
4. ✅ Start frontend: `npm run dev`
5. ✅ Test authentication flow
6. ✅ Set yourself as admin
7. ✅ Access `/admin` panel
