import { Router } from "express";
import {
  getProjectTasks,
  createTask,
  updateTask,
  deleteTask
} from "../controller/task.controller.js";
import { verifyToken, isManagerOrAdmin } from "../middlewares/auth.js";

const router = Router();

// Tareas por proyecto
router
  .get("/project/:projectID", verifyToken, getProjectTasks)
  .post("/project/:projectID", [verifyToken, isManagerOrAdmin], createTask);

// Tareas individuales
router
  .put("/:taskID", [verifyToken], updateTask)
  .delete("/:taskID", [verifyToken, isManagerOrAdmin], deleteTask);

export default router;
