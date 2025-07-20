import { Int32 } from "mongodb";
import mongoose from "mongoose";

const projectShema = new mongoose.Schema({
  nombre: { type: String, required: true },
  id: { type: Int32 },
  name: { type: String, required: true },
  email: { type: String, required: true },
  // role: "admin | manager | developer",
  avatar: { type: String, required: true },
  createdAt: { type: Date}
},
{
  timestamps: true,
  versionKey: false
})

export default mongoose.model('project', projectShema);