import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ['admin', 'manager', 'developer'],
    default: 'developer',
    required: true,
  },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
  versionKey: false
});

// 🔐 Encriptar contraseña antes de guardar
userSchema.statics.encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// 🔐 Comparar contraseñas
userSchema.statics.comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export default mongoose.model('User', userSchema);
