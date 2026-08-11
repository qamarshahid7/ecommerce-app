import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <Link
        to={`/product/${product.id}`}
        className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            {product.category}
          </span>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-bold text-gray-900 mt-1 hover:text-indigo-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-extrabold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center space-x-1 bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium cursor-pointer"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
