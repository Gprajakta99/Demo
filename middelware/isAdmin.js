import User from "../model/user.js";

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export default isAdmin;
