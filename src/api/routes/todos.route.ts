import express from "express";
import {
  getTodos,
  createTodos,
  updateTodos,
  deleteTodos,
} from "../controller/todos.controller";
const router = express.Router();

router.post("/", createTodos);
router.get("/", getTodos);
router.put("/:Id", updateTodos);
router.delete("/:todosId", deleteTodos);

export default router;
