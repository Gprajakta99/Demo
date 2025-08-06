import User from "../model/user.js";

const isAdmin = async (req, res, next) => {
  try {
    // ✅ Allow hardcoded admin
    if (req.user.role === "admin" && req.user.userId === "admin") {
      return next();
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next();
  } catch (err) {
    console.error("isAdmin middleware error:", err.message);
    res.status(500).json({ message: "Server error in admin check" });
  }
};

export default isAdmin;
