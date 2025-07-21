import { Router } from "express";
import { getUseremail } from "../controller/forgot.controller";

const router = Router()

router
  .post("/", getUseremail)


export default router;