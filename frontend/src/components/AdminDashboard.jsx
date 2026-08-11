import React, { useState, useEffect } from "react";
import {
  Users,
  ShoppingBag,
  Package,
  DollarSign,
  UserCheck,
  Shield,
} from "lucide-react";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        };
        const statsRes = await axios.get(
          "http://localhost:5000/api/admin/stats",
          config,
        );
        const usersRes = await axios.get(
          "http://localhost:5000/api/admin/users",
          config,
        );

        setStats(statsRes.data);
        setUsers(usersRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (userInfo && userInfo.role === "admin") {
      fetchAdminData();
    }
  }, [userInfo]);

  if (!userInfo || userInfo.role !== "admin") {
    return (
      <div className="text-center py-16">
        <p className="text-rose-600 font-bold text-xl">
          Access Denied. Admins Only.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-500">
        Loading Admin Dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Admin Dashboard
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Users</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">
              {stats?.totalUsers}
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl text-indigo-600">
            <Users className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Products</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">
              {stats?.totalProducts}
            </p>
          </div>
          <div className="bg-violet-50 p-4 rounded-xl text-violet-600">
            <ShoppingBag className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">
              {stats?.totalOrders}
            </p>
          </div>
          <div className="bg-amber-50 p-4 rounded-xl text-amber-600">
            <Package className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
            <p className="text-3xl font-extrabold text-emerald-600 mt-1">
              ${stats?.totalRevenue?.toFixed(2)}
            </p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl text-emerald-600">
            <DollarSign className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* User Management Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          User Management
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-400 text-sm">
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold">Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-purple-50 text-purple-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {user.role === "admin" ? (
                        <Shield className="w-3 h-3" />
                      ) : (
                        <UserCheck className="w-3 h-3" />
                      )}
                      <span className="capitalize">{user.role}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
