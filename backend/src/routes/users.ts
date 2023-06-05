import { getAuthenticatedUser, logIn, signUp } from "../controllers/users";
import { Router } from "express";

const router = Router();

router.get("/", getAuthenticatedUser);
router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/loout", logOut);

export default router;
