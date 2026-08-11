const axios = require("axios");

const loginTestUser = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/users/login", {
      email: "john@example.com",
      password: "123456password",
    });
    console.log("User Logged In Successfully:", res.data);
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
  }
};

loginTestUser();
