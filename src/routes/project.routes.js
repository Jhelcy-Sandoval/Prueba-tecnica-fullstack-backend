import { Router } from "express";
import {
  getAllProjects,
  createProject,
  getOneProject,
  updateProject,
  deleteProject
} from "../controller/projects.controller.js";

import { verifyToken, isManagerOrAdmin } from "../middlewares/auth.js";

const router = Router();

router
  .get("/", verifyToken, getAllProjects)
  .post("/", [verifyToken, isManagerOrAdmin], createProject)
  .get("/:projectID", verifyToken, getOneProject)
  .put("/:projectID", [verifyToken, isManagerOrAdmin], updateProject)
  .delete("/:projectID", [verifyToken, isManagerOrAdmin], deleteProject);

export default router;
