import {
  createTodoDB,
  getTodosByDateDB,
  toggleFinishTodoDB,
} from "../utils/todos.js";

export const getTodosByDate = async (req, res) => {
  const userId = req.query?.userId ? req.query.userId : res.locals.user.id;
  const { date } = req.query;

  const todos = await getTodosByDateDB(parseInt(userId), date);

  res.json({ status: true, todos });
};

export const createTodo = async (req, res) => {
  const userId = res.locals.user.id;

  return res.json({ status: await createTodoDB({ ...req.body, userId }) });
};

export const toggleFinishTodo = async (req, res) => {
  const userId = res.locals.user.id;
  const { todoId } = req.body;

  return res.json({ status: await toggleFinishTodoDB(userId, todoId) });
};
