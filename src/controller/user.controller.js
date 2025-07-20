import user from '../models/users.model.js'

export const getAllUsers = async (req, res) => {
  try {
    const users= await user.find();
    if (user.length === 0) {
      return res.status(404).json({ status: "error", message: "No users" });
    }
    res.status(201).json(users);
  } catch (error) {
    res.status(401).send(error,'ocurrio un problema')
  }
}

export const createUser = async (req, res) => {
  const {name, email, avatar, createdAt} = req.body;

  if(!name || !email || !avatar || !createdAt){
    return res.status(400).send({ status: "error", message: "nombre is required" });
  }

  try {
    const newUser = new user({
      name, 
      email, 
      avatar, 
      createdAt
      // foto:{
      //   nombre: foto.nombre,
      //   data: foto.data,
      //   type: foto.type
      })
    const userSave = await newUser.save();
    res.status(201).json(userSave);
  } catch (error) {
    res.status(401).send(error, 'ocurrio un problema')
  }
}