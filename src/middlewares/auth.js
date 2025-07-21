import jwt from 'jsonwebtoken';
import config from '../config.js';
import User from '../models/users.model.js';

// Verificar el token JWT
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

// Verificar si el usuario es manager o admin
export const isManagerOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || (user.role !== "admin" && user.role !== "manager")) {
      return res.status(403).json({ message: "Require manager or admin role" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

// Verificar si el usuario es admin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Require admin role" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error: error.message });
  }
}


// Verificar si los roles existen
const allowedRoles = ["admin", "manager", "developer"];

export const checkRolesExisted = (req, res, next) => {
  const { role } = req.body;

  if (role && !allowedRoles.includes(role)) {
    return res.status(400).json({
      message: `Role '${role}' no válido. Roles permitidos: ${allowedRoles.join(", ")}`
    });
  }

  next();
};
