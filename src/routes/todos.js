import express from "express";
import {
  createTodo,
  getTodosByDate,
  toggleFinishTodo,
} from "../controllers/todos.js";
import { authChecker } from "../middleware/authChecker.js";
import { toAsyncRouter } from "../utils/errors.js";

let router = toAsyncRouter(express.Router());

router.get("/", authChecker, getTodosByDate);
router.post("/", authChecker, createTodo);
router.post("/finish", authChecker, toggleFinishTodo);

export default router;
