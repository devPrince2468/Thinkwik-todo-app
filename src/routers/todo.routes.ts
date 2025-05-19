import { Router } from "express";
import todoController from "../controllers/todo.controller";
import { authenticate } from "../middlewares/auth";
import { isValidRole } from "../middlewares/checkRole";

const router = Router();

router.get("/", authenticate, todoController.getTodos);
router.get("/:id", authenticate, todoController.getTodo);
router.post("/", authenticate, isValidRole("admin"), todoController.addTodo);
router.delete(
  "/:id",
  authenticate,
  isValidRole("admin"),
  todoController.deleteTodo
);
router.put(
  "/:id",
  authenticate,
  isValidRole("admin"),
  todoController.updateTodo
);

export default router;
