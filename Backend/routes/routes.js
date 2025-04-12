import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers/MainContoller.js";

const router = express.Router();

router.post("/addTodo", createTodo);
router.get("/todos", getTodos);
router.get('/getTodo/:id', getTodoById);
router.put("/update/:id", updateTodo);
router.delete("/deletetodo/:id", deleteTodo);

export default router;
