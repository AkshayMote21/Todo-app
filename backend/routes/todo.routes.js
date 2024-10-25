import { Router } from "express";
import { CreateNewTodo, DeleteTodo, GetAllTodos, UpdateTodo } from "../controllers/todo.controllers.js";
import { checkIsUserValid } from "../middlewares/user.middleware.js";

const router = Router();

router.get('/get-todo-list',checkIsUserValid,GetAllTodos);
router.post('/create-todo',checkIsUserValid,CreateNewTodo);
router.put('/update-todo/:id',checkIsUserValid,UpdateTodo);
router.delete('/delete-todo/:id',checkIsUserValid,DeleteTodo);

export default router;