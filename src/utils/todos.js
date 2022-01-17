import client from "../client.js";
import dayjs from "dayjs";

export const createTodoDB = async (info) => {
  const { userId, date, quest } = info;

  const todo = await client.toDo.create({
    data: {
      userId,
      date: dayjs(date).toDate(),
      quest,
    },
  });

  return todo !== null;
};

export const getTodosByDateDB = async (userId, date) => {
  const todos = await client.toDo.findMany({
    where: {
      userId,
      date: dayjs(date).toDate(),
    },
  });
  return todos;
};

export const toggleFinishTodoDB = async (userId, todoId) => {
  const todo = await client.toDo.findUnique({
    where: { id: todoId },
    select: { userId: true, finish: true },
  });

  if (todo?.userId !== userId) {
    return false;
  }
  await client.toDo.update({
    where: {
      id: todoId,
    },
    data: {
      finish: !todo.finish,
    },
  });

  return true;
};
