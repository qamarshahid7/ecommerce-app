const axios = require("axios");

const addNewProduct = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/products", {
      name: "Mechanical Keyboard",
      description: "RGB backlit mechanical keyboard with blue switches",
      price: 79.99,
      category: "Electronics",
      stock: 25,
      image: "https://via.placeholder.com/150",
    });
    console.log("New Product Created:", res.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

addNewProduct();
