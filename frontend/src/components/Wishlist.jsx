import React, { useState, useEffect } from "react";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Load wishlist items from local storage
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item._id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-2 mb-6">
        <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
        <h1 className="text-3xl font-extrabold text-gray-900">My Wishlist</h1>
      </div>

      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is currently empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col justify-between"
            >
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-bold text-gray-800 text-lg mb-1">
                  {product.name}
                </h3>
                <p className="text-indigo-600 font-semibold mb-2">
                  ${product.price}
                </p>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {product.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => addToCart(product)}
                  className="flex items-center space-x-1 bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="text-rose-500 hover:text-rose-700 p-2"
                  title="Remove"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
