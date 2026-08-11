const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Calculate total revenue from paid orders
    const orders = await Order.find();
    const totalRevenue = orders.reduce(
      (acc, order) => acc + (order.totalPrice || 0),
      0,
    );

    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      totalUsers,
      totalCustomers,
      totalAdmins,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders,
      recentUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAdminStats, getUsers };
