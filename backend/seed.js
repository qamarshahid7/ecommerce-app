const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");

dotenv.config();

const dummyProducts = [
  {
    name: "Wireless Noise-Canceling Headphones",
    price: 199.99,
    category: "Electronics",
    description:
      "Experience crystal-clear sound and industry-leading noise cancellation.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
  },
  {
    name: "Minimalist Smart Watch",
    price: 149.5,
    category: "Wearables",
    description:
      "Track your fitness, heart rate, and notifications in sleek style.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
  },
  {
    name: "Ergonomic Mechanical Keyboard",
    price: 89.99,
    category: "Accessories",
    description:
      "Tactile switches and customizable RGB backlighting for peak productivity.",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60",
  },
  {
    name: "Classic Leather Backpack",
    price: 120.0,
    category: "Fashion",
    description:
      "Durable genuine leather crafted for daily commutes and weekend getaways.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing products and insert dummy products
    await Product.deleteMany({});
    await Product.insertMany(dummyProducts);

    console.log("Database seeded successfully with products!");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
