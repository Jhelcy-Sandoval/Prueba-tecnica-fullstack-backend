import User from "../models/users.model.js";

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ message: "Nombre y email son requeridos" });
  }

  try {
    const nameExists = await User.findOne({ name });
    if (nameExists) {
      return res.status(400).json({ message: "El nombre ya está en uso" });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "El correo ya está en uso" });
    }

    next();
  } catch (error) {
    console.error('Error checking for duplicate username or email:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
