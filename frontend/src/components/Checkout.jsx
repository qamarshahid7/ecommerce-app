import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ShoppingBag, CheckCircle } from "lucide-react";
import axios from "axios";

export default function Checkout() {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null,
  );
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || [],
  );

  // Login form states for unauthenticated users on checkout page
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Checkout form states
  const [fullName, setFullName] = useState(userInfo ? userInfo.name : "");
  const [email, setEmail] = useState(userInfo ? userInfo.email : "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const totalAmount = subtotal; // Add shipping if needed

  const handleInlineLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: loginEmail,
          password: loginPassword,
        },
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUserInfo(data);
      setEmail(data.email);
      setFullName(data.name);
    } catch (err) {
      setLoginError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
      );
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          product: item._id || item.product,
        })),
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          phone,
        },
        paymentMethod: "CashOnDelivery",
        totalPrice: totalAmount,
        orderNotes,
      };

      // Post order to backend (adjust endpoint route as per your order backend setup)
      await axios.post("http://localhost:5000/api/orders", orderData, config);

      // Clear cart
      localStorage.removeItem("cartItems");
      setCartItems([]);
      setSuccess(true);

      setTimeout(() => {
        navigate("/my-orders");
      }, 2000);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mt-2">Redirecting to your orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>

      {/* If User is Not Logged In: Show Inline Login Section at the Top */}
      {!userInfo && (
        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-amber-900 mb-2">
            Please sign in to complete your checkout
          </h3>
          <p className="text-sm text-amber-700 mb-4">
            You must be logged in to place an order. Your cart items are safely
            saved below.
          </p>

          {loginError && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
              {loginError}
            </div>
          )}

          <form
            onSubmit={handleInlineLogin}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div>
              <input
                type="email"
                placeholder="Email address"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors"
              >
                Login & Unlock Form
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Checkout Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Checkout Form (Disabled if not logged in) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative">
          {!userInfo && (
            <div className="absolute inset-0 bg-gray-50 bg-opacity-70 z-10 flex items-center justify-center backdrop-blur-[1px] rounded-xl">
              <p className="text-gray-700 font-semibold bg-white px-4 py-2 rounded-lg shadow border">
                🔒 Please login above to enable the checkout form
              </p>
            </div>
          )}

          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Shipping Information
          </h2>
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  disabled
                  className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="+1234567890"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipping Address
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="123 Main St"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code (Optional)
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Notes (Optional)
              </label>
              <textarea
                rows="2"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="Special delivery instructions..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={!userInfo || loading || cartItems.length === 0}
              className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Processing Order..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-sm">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm border-b pb-3"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
                  <span>Total Amount</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
