# Authentication System - Implementation Examples

## 1. "Remember Me" & Auto-Login

### Add to App.tsx:
```typescript
useEffect(() => {
  // Check if user was previously logged in
  const savedUser = localStorage.getItem("user");
  if (savedUser && !user && !loading) {
    // User was logged in before, auto-login
    navigate("/dashboard");
  }
}, [user, loading]);
```

---

## 2. Show Admin Badge in Navbar

### Navbar Component:
```typescript
import { Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchWithAuth } from "../utils/api";

export function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchWithAuth("http://localhost:8000/user-role")
      .then(res => res.json())
      .then(data => setIsAdmin(data.role === "admin"));
  }, []);

  return (
    <nav className="flex items-center justify-between">
      {/* ... navbar content ... */}
      
      {isAdmin && (
        <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">
          <Shield className="w-3 h-3" />
          Admin
        </div>
      )}
    </nav>
  );
}
```

---

## 3. Admin-Only Navigation Link

### Add to Sidebar/Navbar:
```typescript
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchWithAuth } from "../utils/api";

function Navigation() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchWithAuth("http://localhost:8000/user-role")
      .then(res => res.json())
      .then(data => setIsAdmin(data.role === "admin"));
  }, []);

  return (
    <nav className="space-y-2">
      <Link to="/dashboard">Dashboard</Link>
      {isAdmin && (
        <Link to="/admin" className="text-purple-600 font-bold">
          ⚙️ Admin Panel
        </Link>
      )}
    </nav>
  );
}
```

---

## 4. Protected Admin Component

### Example Admin Feature:
```typescript
import { useState, useEffect } from "react";
import { fetchWithAuth } from "../utils/api";

export function AdminDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const response = await fetchWithAuth("http://localhost:8000/admin/users");
      
      if (response.status === 403) {
        setError("You don't have permission to access this");
        return;
      }

      if (!response.ok) throw new Error("Failed to load data");
      
      const json = await response.json();
      setData(json.users);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (error) return <div className="text-red-600">{error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Render data */}
    </div>
  );
}
```

---

## 5. Logout Function

### Add to Dashboard or Header:
```typescript
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}
```

---

## 6. Redirect Non-Admins from Admin Page

### In Admin.tsx (optional):
```typescript
useEffect(() => {
  checkAdminAccess();
}, []);

const checkAdminAccess = async () => {
  try {
    const response = await fetchWithAuth("http://localhost:8000/user-role");
    const data = await response.json();
    
    if (data.role !== "admin") {
      notify("You don't have access to this page");
      navigate("/dashboard");
    }
  } catch (error) {
    navigate("/dashboard");
  }
};
```

---

## 7. User Profile Component

### Show Current User Info:
```typescript
import { useEffect, useState } from "react";
import { auth } from "../firebase";

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2>{user.displayName || user.email}</h2>
      <p>{user.email}</p>
      <p>Created: {user.metadata.creationTime}</p>
    </div>
  );
}
```

---

## 8. Event Creation with Error Handling

### Complete Example:
```typescript
import { useState } from "react";
import { fetchWithAuth, getAuthToken } from "../utils/api";

function CreateEventForm() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Ensure we have a fresh token
      await getAuthToken();

      const response = await fetchWithAuth(
        "http://localhost:8000/create-event",
        {
          method: "POST",
          body: JSON.stringify({ title, description: "" }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Failed to create event");
      }

      const event = await response.json();
      setSuccess(`Event "${event.event.title}" created!`);
      setTitle("");
    } catch (err: any) {
      // Handle 401 (token expired)
      if (err.message.includes("403") || err.message.includes("401")) {
        setError("Your session expired. Please login again.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}

      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Event title"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        {loading ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
}
```

---

## 9. Global Error Boundary for Auth

### Authentication Wrapper:
```typescript
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export function AuthRequired({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Check token still valid
    const checkAuth = auth.onAuthStateChanged(user => {
      if (!user) {
        navigate("/login");
      }
    });

    return () => checkAuth();
  }, [navigate]);

  return <>{children}</>;
}

// Usage:
<AuthRequired>
  <Dashboard />
</AuthRequired>
```

---

## 10. Batch User Operations

### Admin managing multiple users:
```typescript
async function promoteMultipleUsers(emails: string[]) {
  const results = [];

  for (const email of emails) {
    try {
      const response = await fetchWithAuth(
        `http://localhost:8000/admin/make-admin/${email}`,
        { method: "POST" }
      );

      if (response.ok) {
        results.push({ email, success: true });
      } else {
        results.push({ email, success: false, error: await response.text() });
      }
    } catch (error: any) {
      results.push({ email, success: false, error: error.message });
    }
  }

  return results;
}

// Usage:
const results = await promoteMultipleUsers([
  "user1@example.com",
  "user2@example.com"
]);
console.log(results);
```

---

## 11. Middleware for Form Validation

### Before making API calls:
```typescript
function validateEventForm(data: any): string | null {
  if (!data.title || data.title.trim().length === 0) {
    return "Title is required";
  }
  if (data.title.length > 100) {
    return "Title must be less than 100 characters";
  }
  if (!data.description || data.description.trim().length === 0) {
    return "Description is required";
  }
  return null;
}

// Usage:
const error = validateEventForm(form);
if (error) {
  setError(error);
  return;
}
```

---

## 12. API Request with Timeout

### Prevent hanging requests:
```typescript
async function fetchWithTimeout(url: string, options = {}, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}
```

---

All these examples are production-ready and can be directly integrated into your components!
