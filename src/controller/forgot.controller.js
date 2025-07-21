import User from "../models/user.model.js";
import config from '../config/index.js';
import jwt from 'jsonwebtoken';

export const getUseremail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      status: "error",
      message: "El email es requerido"
    });
  }

  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(404).json({
        status: "error",
        message: "El usuario no existe"
      });
    }

    if (!config.SECRET) {
      console.error("SECRET_KEY is not defined.");
      return res.status(500).json({
        status: "error",
        message: "Clave secreta del servidor no configurada"
      });
    }

    const token = jwt.sign({ id: foundUser._id }, config.SECRET, {
      expiresIn: 3600 // 1 hora
    });

    console.log("Token generado para recuperación:", token);

    return res.status(200).json({
      status: "success",
      message: "Token generado. El usuario puede actualizar la contraseña.",
      token,
      email: foundUser.email
    });

  } catch (error) {
    console.error("Error en getUseremail:", error.message);
    return res.status(500).json({
      status: "error",
      message: "Ocurrió un problema al procesar la solicitud"
    });
  }
};
