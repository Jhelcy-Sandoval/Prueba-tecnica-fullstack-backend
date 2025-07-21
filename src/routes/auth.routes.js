import { Router } from "express";
import {
  signup,
  signin,
  getUseremail,
  resetPassword
} from "../controller/auth.controller.js";
import { checkDuplicateUsernameOrEmail } from "../middlewares/varifySignup.js";

const router = Router();

router.post("/signup", [checkDuplicateUsernameOrEmail], signup);
router.post("/signin", signin);
router.post("/forgot", getUseremail);
router.patch("/reset", resetPassword);

export default router;
