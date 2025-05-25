import { AppError } from "../helpers/AppError";
import { Todo } from "../Schemas/Todo";

export const todoService = {
  getTodos: async (userId: string) => {
    try {
      let todos;
      if (userId === "") {
        todos = await Todo.find({});
      } else {
        todos = await Todo.find({ user: userId });
      }
      if (!todos || todos.length === 0) {
        throw new AppError("No todos found for this user", 404);
      }
      return todos;
    } catch (error) {
      throw new AppError(error.message || "Error fetching todo", 500);
    }
  },
  getTodo: async (todoId: string, userId: string) => {
    try {
      let todo;
      if (userId === "") {
        todo = await Todo.findById(todoId);
      } else {
        todo = await Todo.findOne({ _id: todoId, user: userId });
      }
      if (!todo) {
        throw new AppError("Todo not found", 404);
      }
      return todo;
    } catch (error) {
      throw new AppError(error.message || "Error fetching todo", 500);
    }
  },
  addTodo: async (todoData: any, userId: string) => {
    try {
      if (todoData.dueDate) {
        const dueDate = new Date(todoData.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isNaN(dueDate.getTime())) {
          throw new AppError("Invalid dueDate format", 400);
        }
        if (dueDate < today) {
          throw new AppError("dueDate cannot be in the past", 400);
        }
        todoData.dueDate = dueDate;
      }
      todoData.user = userId;
      const newTodo = new Todo(todoData);
      await newTodo.save();
      return newTodo;
    } catch (error) {
      throw new AppError(error.message || "Error adding todo", 500);
    }
  },
  updateTodo: async (todoId: string, todoData: any, userId: string) => {
    try {
      if (todoData.dueDate) {
        const dueDate = new Date(todoData.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isNaN(dueDate.getTime())) {
          throw new AppError("Invalid dueDate format", 400);
        }
        if (dueDate < today) {
          throw new AppError("dueDate cannot be in the past", 400);
        }
        todoData.dueDate = dueDate;
      }
      const updatedTodo = await Todo.findOneAndUpdate(
        { _id: todoId, user: userId },
        { $set: todoData },
        { new: true }
      );
      if (!updatedTodo) {
        throw new AppError("Todo not found", 404);
      }
      return updatedTodo;
    } catch (error) {
      throw new AppError(error.message || "Error updating todo", 500);
    }
  },
  deleteTodo: async (todoId: string, userId: string) => {
    try {
      const deletedTodo = await Todo.findOneAndDelete({
        _id: todoId,
        user: userId,
      });
      if (!deletedTodo) {
        throw new AppError("Todo not found", 404);
      }
      return deletedTodo;
    } catch (error) {
      throw new AppError(error.message || "Error deleting todo", 500);
    }
  },
};
