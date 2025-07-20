import project from '../models/project.model.js'

export const getAllProject = async (req, res) => {
  const {nombre} = req.params;
  if(!nombre){
    return res.status(400).send({ status: "error", message: "nombre is required" });
  }
  try {
    const projects= await project.find({nombre});
    if (projects.length === 0) {
      return res.status(404).json({ status: "error", message: "No projects found for this user" });
    }
    res.status(201).json(projects);
  } catch (error) {
    res.status(401).send(error,'ocurrio un problema')
  }
}