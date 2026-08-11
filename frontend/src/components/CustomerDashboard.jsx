import React, { useState, useEffect } from "react";
import { Package, Heart, User, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CustomerDashboard() {
  const [orderCount, setOrderCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    // Load wishlist count
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistCount(savedWishlist.length);

    // Fetch user orders count from backend
    const fetchOrders = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.get(
          "http://localhost:5000/api/orders/myorders",
          config,
        );
        setOrderCount(data.length);
      } catch (err) {
        console.error(err);
      }
    };

    if (userInfo) {
      fetchOrders();
    }
  }, [userInfo]);

  if (!userInfo) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 mb-4">
          Please log in to view your dashboard.
        </p>
        <Link
          to="/login"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium"
        >
          Login Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white mb-8 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-4 rounded-full">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {userInfo.name}!
            </h1>
            <p className="text-indigo-100">{userInfo.email}</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Total Orders Placed
            </p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">
              {orderCount}
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl text-indigo-600">
            <Package className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Wishlist Items</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">
              {wishlistCount}
            </p>
          </div>
          <div className="bg-rose-50 p-4 rounded-xl text-rose-600">
            <Heart className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <Link
          to="/my-orders"
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition"
        >
          View My Orders
        </Link>
        <Link
          to="/wishlist"
          className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition"
        >
          View Wishlist
        </Link>
      </div>
    </div>
  );
}
