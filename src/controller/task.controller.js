import Task from "../models/task.model.js";

export const getProjectTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectID }).populate("assignedTo");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err });
  }
};

export const createTask = async (req, res) => {
  try {
    const newTask = new Task({
      ...req.body,
      projectId: req.params.projectID
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: "Error creating task", error: err });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.taskID, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Task not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating task", error: err });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.taskID);
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err });
  }
};
