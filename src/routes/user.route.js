import { Router } from "express";
import {createUser, getAllUsers} from "../controller/user.controller.js"

const router = Router()

router 
  .get("/", getAllUsers)

  // .get("/one/:projectID", verifyToken, getOneProject)

  .post("/", createUser)

  // .patch("/:projectID", verifyToken, updateProject)
  
  // .delete("/:projectID", verifyToken, deleteProject)

export default router;