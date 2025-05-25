import { Router } from "express";
import todoController from "../controllers/todo.controller";
import { authenticate } from "../middlewares/auth";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get(
  "/",
  authenticate,
  checkPermission("read", "todo", "own"),
  todoController.getTodos
);
router.get(
  "/:id",
  authenticate,
  checkPermission("read", "todo", "own"),
  todoController.getTodo
);
router.post(
  "/",
  authenticate,
  checkPermission("create", "todo", "own"),
  todoController.addTodo
);
router.delete(
  "/:id",
  authenticate,
  checkPermission("delete", "todo", "own"),
  todoController.deleteTodo
);
router.put(
  "/:id",
  authenticate,
  checkPermission("update", "todo", "own"),
  todoController.updateTodo
);

export default router;
