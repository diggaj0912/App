import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Users, Calendar, Zap, TrendingUp } from "lucide-react";
import { fetchWithAuth } from "../utils/api";

interface AnalyticsData {
  totalEvents: number;
  totalCommunities: number;
  totalUsers: number;
  activeUsers: number;
  lastUpdated: string;
}

interface StatCard {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAnalytics();

    // Refresh analytics every 30 seconds
    const interval = setInterval(loadAnalytics, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadAnalytics = async () => {
    try {
      const response = await fetchWithAuth("http://localhost:8000/analytics");

      if (!response.ok) {
        throw new Error("Failed to load analytics");
      }

      const data = await response.json();
      setAnalytics(data);
      setError("");
    } catch (err: any) {
      console.error("Error loading analytics:", err);
      setError(err.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadAnalytics}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const stats: StatCard[] = [
    {
      label: "Total Events",
      value: analytics.totalEvents,
      icon: <Calendar className="w-6 h-6" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Communities",
      value: analytics.totalCommunities,
      icon: <Users className="w-6 h-6" />,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Total Users",
      value: analytics.totalUsers,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Active Users",
      value: analytics.activeUsers,
      icon: <Zap className="w-6 h-6" />,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  // Data for pie chart
  const pieData = [
    { name: "Events", value: analytics.totalEvents },
    { name: "Communities", value: analytics.totalCommunities },
    { name: "Users", value: analytics.totalUsers },
  ];

  const COLORS = ["#3b82f6", "#a855f7", "#10b981"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600 mt-2">
                Last updated: {new Date(analytics.lastUpdated).toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={loadAnalytics}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className={`inline-flex p-3 rounded-lg ${stat.color} mb-4`}>
                {stat.icon}
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Overview
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  {
                    name: "Statistics",
                    Events: analytics.totalEvents,
                    Communities: analytics.totalCommunities,
                    Users: analytics.totalUsers,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="Events" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Communities" fill="#a855f7" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Users" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-900 mb-2">
                Engagement Rate
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {analytics.totalUsers > 0
                  ? Math.round((analytics.activeUsers / analytics.totalUsers) * 100)
                  : 0}
                %
              </p>
              <p className="text-xs text-blue-700 mt-1">
                {analytics.activeUsers} of {analytics.totalUsers} users active
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm font-medium text-purple-900 mb- 2">
                Events per Community
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {analytics.totalCommunities > 0
                  ? Math.round(analytics.totalEvents / analytics.totalCommunities)
                  : 0}
              </p>
              <p className="text-xs text-purple-700 mt-1">
                {analytics.totalEvents} events across {analytics.totalCommunities} communities
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
