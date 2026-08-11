import React, { useState, useEffect } from "react";
import axios from "axios";
import { Package, Clock, CheckCircle } from "lucide-react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.get(
          "http://localhost:5000/api/orders/myorders",
          config,
        );
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (userInfo) fetchOrders();
  }, []);

  if (loading)
    return <div className="text-center py-12">Loading orders...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-600">
                    Order ID:{" "}
                  </span>
                  <span className="text-gray-900">{order._id}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Total: </span>
                  <span className="font-bold text-indigo-600">
                    ${order.totalPrice.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${order.isDelivered ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                  >
                    {order.isDelivered ? "Delivered" : "Processing"}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                {order.orderItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
