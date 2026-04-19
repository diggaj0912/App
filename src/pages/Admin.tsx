import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Trash2, UserCog } from "lucide-react";
import { fetchWithAuth } from "../utils/api";

interface User {
  email: string;
  name: string;
  role: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth("http://localhost:8000/admin/users");
      
      if (!response.ok) {
        if (response.status === 403) {
          setError("You don't have admin access");
          navigate("/dashboard");
          return;
        }
        throw new Error("Failed to load users");
      }
      
      const data = await response.json();
      setUsers(data.users || []);
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const makeAdmin = async (email: string) => {
    try {
      const response = await fetchWithAuth(
        `http://localhost:8000/admin/make-admin/${email}`,
        { method: "POST" }
      );
      
      if (response.ok) {
        loadUsers();
      } else {
        setError("Failed to make user admin");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const removeAdmin = async (email: string) => {
    try {
      const response = await fetchWithAuth(
        `http://localhost:8000/admin/remove-admin/${email}`,
        { method: "POST" }
      );
      
      if (response.ok) {
        loadUsers();
      } else {
        setError("Failed to remove admin role");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteUser = async (email: string) => {
    if (!confirm(`Are you sure you want to delete ${email}?`)) return;
    
    try {
      const response = await fetchWithAuth(
        `http://localhost:8000/admin/users/${email}`,
        { method: "DELETE" }
      );
      
      if (response.ok) {
        loadUsers();
      } else {
        setError("Failed to delete user");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-[#7c3aed]" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <p className="text-gray-600">Manage users and their roles</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.email}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2 flex">
                      {user.role !== "admin" ? (
                        <button
                          onClick={() => makeAdmin(user.email)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition-colors"
                        >
                          <UserCog className="w-4 h-4" />
                          Make Admin
                        </button>
                      ) : (
                        <button
                          onClick={() => removeAdmin(user.email)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                        >
                          <UserCog className="w-4 h-4" />
                          Remove Admin
                        </button>
                      )}

                      <button
                        onClick={() => deleteUser(user.email)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
