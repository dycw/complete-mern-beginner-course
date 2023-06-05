import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "../controllers/notes";
import { Router } from "express";

const router = Router();

router.get("/", getNotes);
router.get("/:noteId", getNote);
router.post("/", createNote);
router.patch("/:noteId", updateNote);
router.delete("/:noteId", deleteNote);

export default router;
