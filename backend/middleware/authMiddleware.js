import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ error: "Please authenticate." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Please authenticate." });
    }
    req.user = decoded;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== "admin") {
      return res.status(403).send({ error: "Access denied." });
    }
    next();
  } catch (error) {
    res.status(500).send({ error: "Server error." });
  }
};

export { authenticate, isAdmin };
