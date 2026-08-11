const axios = require("axios");

const registerTestUser = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/users", {
      name: "John Doe",
      email: "john@example.com",
      password: "123456password",
    });
    console.log("User Registered Successfully:", res.data);
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response?.data || error.message,
    );
  }
};

registerTestUser();
