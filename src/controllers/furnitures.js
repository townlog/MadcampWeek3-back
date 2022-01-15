import { addPhoto } from "../utils/furnitures.js";

export const createBook = async (req, res) => {
  const userId = res.locals.user.id;
  const book = await addPhoto({ userId, ...req.body });
  res.json({ status: true, book });
};

export const createMusic = async (req, res) => {
  const userId = res.locals.user.id;
  const music = await addPhoto({ userId, ...req.body });
  res.json({ status: true, music });
};

export const createTravel = async (req, res) => {
  const userId = res.locals.user.id;
  const travel = await addPhoto({ userId, ...req.body });
  res.json({ status: true, travel });
};

export const createPhoto = async (req, res) => {
  const userId = res.locals.user.id;
  const photo = await addPhoto({ userId, ...req.body });
  res.json({ status: true, photo });
};
