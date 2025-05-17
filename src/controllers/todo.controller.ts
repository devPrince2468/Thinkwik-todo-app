import { Request, Response, NextFunction } from "express";
import { todoJoiSchema } from "../Schemas/Todo";
import { User } from "../Schemas/User";
import { todoService } from "../services/todo.service";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const todoController = {
  getTodos: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const todos = await todoService.getTodos(userId);
      res.status(200).json(todos);
    } catch (error) {
      next(error);
    }
  },
  getTodo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todoId = req.params.id;
      const userId = req.user.id;
      const todo = await todoService.getTodo(todoId, userId);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  },
  addTodo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description, dueDate } = req.body;
      const userId = req.user.id;

      const { error } = todoJoiSchema.validate({ title, description, dueDate });
      if (error) {
        return res
          .status(400)
          .json({ message: "Validation error", details: error.details });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newTodo = await todoService.addTodo(
        {
          title,
          description,
          dueDate,
          user: user._id,
        },
        userId
      );

      res.status(201).json(newTodo);
    } catch (error) {
      next(error);
    }
  },

  updateTodo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todoId = req.params.id;
      const userId = req.user.id;
      const { title, description, dueDate, completed } = req.body;

      const updatedTodo = await todoService.updateTodo(
        todoId,
        {
          title,
          description,
          dueDate,
          completed,
        },
        userId
      );

      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.status(200).json(updatedTodo);
    } catch (error) {
      next(error);
    }
  },
  deleteTodo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todoId = req.params.id;
      const userId = req.user.id;
      const deletedTodo = await todoService.deleteTodo(todoId, userId);
      if (!deletedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};

export default todoController;
