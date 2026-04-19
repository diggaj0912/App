import { auth } from "./firebase";

/**
 * Fetch with Firebase authentication token
 * Automatically adds Authorization header
 */
export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  try {
    const token = localStorage.getItem("authToken");
    
    if (!token && auth.currentUser) {
      // If no stored token, get fresh one from current user
      const freshToken = await auth.currentUser.getIdToken();
      localStorage.setItem("authToken", freshToken);
    }

    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      headers["Authorization"] = storedToken;
    }

    return fetch(url, {
      ...options,
      headers,
    });
  } catch (error) {
    console.error("fetchWithAuth error:", error);
    throw error;
  }
}

/**
 * Get fresh ID token from current user
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    if (!auth.currentUser) return null;
    const token = await auth.currentUser.getIdToken();
    localStorage.setItem("authToken", token);
    return token;
  } catch (error) {
    console.error("Failed to get auth token:", error);
    return null;
  }
}
