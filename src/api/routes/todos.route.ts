import express from "express";
import {
  getTodos,
  createTodos,
  updateTodos,
  deleteTodos,
  getTood_by_Id,
} from "../controller/todos.controller";
const router = express.Router();

router.post("/", createTodos);
router.get("/", getTodos);
router.put("/:Id", updateTodos);
router.delete("/:todosId", deleteTodos);
router.get("/:todosId",getTood_by_Id);
export default router;
