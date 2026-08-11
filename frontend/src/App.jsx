import Checkout from "./components/Checkout";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProductDetails from "./components/ProductDetails";
import Wishlist from "./components/Wishlist";
import CustomerDashboard from "./components/CustomerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import MyOrders from "./components/MyOrders";

const dummyProducts = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    price: 199.99,
    category: "Electronics",
    description:
      "Experience crystal-clear sound and industry-leading noise cancellation.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Minimalist Smart Watch",
    price: 149.5,
    category: "Wearables",
    description:
      "Track your fitness, heart rate, and notifications in sleek style.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Ergonomic Mechanical Keyboard",
    price: 89.99,
    category: "Accessories",
    description:
      "Tactile switches and customizable RGB backlighting for peak productivity.",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    name: "Classic Leather Backpack",
    price: 120.0,
    category: "Fashion",
    description:
      "Durable genuine leather crafted for daily commutes and weekend getaways.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60",
  },
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    alert(`${product.name} added to cart!`);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  };
  const handleClearCart = () => setCartItems([]);

  const categories = [
    "All",
    "Electronics",
    "Wearables",
    "Accessories",
    "Fashion",
  ];

  const filteredProducts = dummyProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar cartCount={cartItems.length} />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
                      Welcome to ShopZone
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                      Discover our handpicked collection of top-tier tech and
                      lifestyle products.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto mb-6">
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    {/* Category Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            selectedCategory === category
                              ? "bg-indigo-600 text-white shadow-md"
                              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {filteredProducts.length === 0 ? (
                    <p className="text-center text-gray-500 py-12">
                      No products found matching your search.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filteredProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onAddToCart={handleAddToCart}
                        />
                      ))}
                    </div>
                  )}
                </div>
              }
            />
            <Route
              path="/products"
              element={
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dummyProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                </div>
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  removeFromCart={handleRemoveFromCart}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/product/:id"
              element={
                <ProductDetails
                  products={dummyProducts}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <Checkout cartItems={cartItems} clearCart={handleClearCart} />
              }
            />

            {/* Newly Added Routes for Rubric Completion */}
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
