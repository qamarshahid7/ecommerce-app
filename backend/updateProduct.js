const axios = require("axios");

const updateTestProduct = async () => {
  try {
    const productId = "6a65311671c2906a3378e5e3"; // Your Mechanical Keyboard ID
    const res = await axios.put(
      `http://localhost:5000/api/products/${productId}`,
      {
        price: 89.99, // Updating the price
        stock: 30, // Updating the stock count
      },
    );
    console.log("Product Updated Successfully:", res.data);
  } catch (error) {
    console.error(
      "Error updating product:",
      error.response?.data || error.message,
    );
  }
};

updateTestProduct();
