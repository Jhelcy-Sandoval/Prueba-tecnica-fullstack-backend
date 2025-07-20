import { Router } from "express";
import {
  getAllProject,
} from "../controller/project.controller.js";

const router = Router()

router 
  .get("/:nombre", getAllProject)

  // .get("/one/:projectID", verifyToken, getOneProject)

  // .post("/", verifyToken, createProject)

  // .patch("/:projectID", verifyToken, updateProject)
  
  // .delete("/:projectID", verifyToken, deleteProject)

export default router;