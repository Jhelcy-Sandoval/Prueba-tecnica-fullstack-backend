import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/users.model';
// import Role from '../models/roles.model';

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
}

// // Verificar si el usuario es moderador o administrador
// export const isModerador = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.userId);
//     const roles = await Role.find({ _id: { $in: user.rol } });

//     for (let i = 0; i < roles.length; i++) {
//       if (roles[i].name === "moderator" || roles[i].name === "admin") {
//         next();
//         return;
//       }
//     }

//     return res.status(403).json({ message: "Require moderator or admin role" });
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized", error: error.message });
//   }
// }

// // Verificar si el usuario es administrador
// export const isAdmin = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.userId);
//     const roles = await Role.find({ _id: { $in: user.rol } });

//     for (let i = 0; i < roles.length; i++) {
//       if (roles[i].name === "admin") {
//         next();
//         return;
//       }
//     }

//     return res.status(403).json({ message: "Require admin role" });
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized", error: error.message });
//   }
// }
