const axios = require("axios");

const deleteTestProduct = async () => {
  try {
    // Replace with your Wireless Mouse ID if needed
    const productId = "6a652d7a92d0cbc9819daed8";
    const res = await axios.delete(
      `http://localhost:5000/api/products/${productId}`,
    );
    console.log("Product Deleted Successfully:", res.data);
  } catch (error) {
    console.error(
      "Error deleting product:",
      error.response?.data || error.message,
    );
  }
};

deleteTestProduct();
