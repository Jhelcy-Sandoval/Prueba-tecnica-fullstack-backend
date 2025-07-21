import User from "../models/users.model.js";
import config from '../config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  const { name, email, password, role, avatar } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "developer",
      avatar: avatar || "https://api.dicebear.com/7.x/miniavs/svg?seed=user"
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, config.SECRET, {
      expiresIn: 86400
    });

    res.status(201).json({ token, userId: newUser._id });
  } catch (error) {
    console.error("Error en signup:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son requeridos" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await User.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ token: null, message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user._id }, config.SECRET, {
      expiresIn: 86400 // 1 día
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error("Error en inicio de sesión:", error.message);
    res.status(500).json({ message: "Error en inicio de sesión", error: error.message });
  }
};


export const getUseremail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ status: "error", message: "El email es requerido" });
  }

  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(404).json({ status: "error", message: "El usuario no existe" });
    }

    const token = jwt.sign({ id: foundUser._id }, config.SECRET, { expiresIn: 3600 });

    return res.status(200).json({
      status: "success",
      message: "Token generado. El usuario puede actualizar la contraseña.",
      token,
      email: foundUser.email
    });

  } catch (error) {
    return res.status(500).json({ message: "Error al procesar la solicitud" });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, config.SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
