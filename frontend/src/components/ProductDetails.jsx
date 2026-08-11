import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Star } from "lucide-react";

export default function ProductDetails({ products, onAddToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id)) || products[0];
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 mb-8 font-medium"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Products</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        {/* Product Image */}
        <div className="h-96 lg:h-[500px] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-2">
              {product.name}
            </h1>

            <div className="flex items-center space-x-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-current text-yellow-400"
                />
              ))}
              <span className="text-gray-500 text-sm ml-2">
                (4.8 / 5 reviews)
              </span>
            </div>

            <p className="text-3xl font-bold text-gray-900 mt-6">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 mt-4 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-6 border-t border-gray-100 pt-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase">
                Quantity
              </h3>
              <div className="flex items-center space-x-4 mt-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-100 px-3 py-1 rounded-lg text-lg font-bold text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  -
                </button>
                <span className="text-xl font-bold text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-100 px-3 py-1 rounded-lg text-lg font-bold text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => {
                for (let i = 0; i < quantity; i++) {
                  onAddToCart(product);
                }
              }}
              className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white py-4 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-md"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>
                Add {quantity} to Cart - $
                {(product.price * quantity).toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
