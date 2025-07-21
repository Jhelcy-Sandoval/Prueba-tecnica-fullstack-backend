import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  resetPassword,
  updateUser
} from "../controller/users.controller.js";

import { verifyToken, isAdmin, checkRolesExisted } from "../middlewares/auth.js";

const router = Router();

router
  .get("/", verifyToken, getAllUsers)
  .post("/", [verifyToken, isAdmin, checkRolesExisted], createUser)
  .get("/:userID", verifyToken, getOneUser)
  .patch("/:userID", verifyToken, updateUser)
  .patch("/reset/:email", verifyToken, resetPassword)
  .delete("/:userID", [verifyToken, isAdmin], deleteUser);

export default router;
