import {
  getAuthenticatedUser,
  logIn,
  logOut,
  signUp,
} from "../controllers/users";
import { requiresAuth } from "../middleware/auth";
import { Router } from "express";

const router = Router();

router.get("/", requiresAuth, getAuthenticatedUser);
router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);

export default router;
