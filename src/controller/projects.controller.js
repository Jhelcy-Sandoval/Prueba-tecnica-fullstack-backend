import Project from "../models/project.model.js";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("managerId developersIds");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err });
  }
};

export const getOneProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectID).populate("managerId developersIds");
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Error fetching project", error: err });
  }
};

export const createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: "Error creating project", error: err });
  }
};

export const updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.projectID, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating project", error: err });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.projectID);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting project", error: err });
  }
};
