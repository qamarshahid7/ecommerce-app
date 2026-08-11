const axios = require("axios");

const createTestProduct = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/products", {
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse with USB receiver",
      price: 25.99,
      category: "Electronics",
      stock: 50,
      image: "https://via.placeholder.com/150",
    });
    console.log("Product Created Successfully:", res.data);
  } catch (error) {
    console.error(
      "Error creating product:",
      error.response?.data || error.message,
    );
  }
};

createTestProduct();
