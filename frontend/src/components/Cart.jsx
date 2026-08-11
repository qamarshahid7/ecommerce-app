import React from "react";
import { Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cart({ cartItems, removeFromCart }) {
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 justify-between"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.category}</p>
                  <p className="font-semibold text-indigo-600 mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(index)}
                className="text-red-500 hover:text-red-700 p-2 transition-colors"
                title="Remove item"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Order Summary
          </h2>
          <div className="flex justify-between py-2 border-b border-gray-100 text-gray-600">
            <span>Subtotal</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 text-gray-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between py-4 text-lg font-bold text-gray-900">
            <span>Total</span>
            <span className="text-indigo-600">${totalAmount.toFixed(2)}</span>
          </div>
          {/* Updated to Link */}
          <Link
            to="/checkout"
            className="block text-center w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors mt-4"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
