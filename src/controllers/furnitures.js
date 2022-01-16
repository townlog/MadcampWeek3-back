import {
  addBook,
  addMusic,
  addPhoto,
  addTravel,
  getBookByUser,
  getMusicByUser,
  getPhotoByUser,
  getTravelByUser,
} from "../utils/furnitures.js";

export const createBook = async (req, res) => {
  const userId = res.locals.user.id;
  const book = await addBook({ userId, ...req.body });
  res.json({ status: true, book });
};

export const createMusic = async (req, res) => {
  const userId = res.locals.user.id;
  const music = await addMusic({ userId, ...req.body });
  res.json({ status: true, music });
};

export const createTravel = async (req, res) => {
  const userId = res.locals.user.id;
  const travel = await addTravel({ userId, ...req.body });
  res.json({ status: true, travel });
};

export const createPhoto = async (req, res) => {
  const userId = res.locals.user.id;
  const photo = await addPhoto({ userId, ...req.body });
  res.json({ status: true, photo });
};

export const getBooks = async (req, res) => {
  const user = res.locals.user;
  const userId = req.query.userId;
  if (userId) {
    const books = await getBookByUser({ id: parseInt(userId) });
    res.json({ status: true, books });
  } else {
    const books = await getBookByUser(user);
    res.json({ status: true, books });
  }
};

export const getMusics = async (req, res) => {
  const user = res.locals.user;
  const userId = req.query.userId;
  if (userId) {
    const musics = await getMusicByUser({ id: parseInt(userId) });
    res.json({ status: true, musics });
  } else {
    const musics = await getMusicByUser(user);
    res.json({ status: true, musics });
  }
};

export const getTravels = async (req, res) => {
  const user = res.locals.user;
  const userId = req.query.userId;
  if (userId) {
    const travels = await getTravelByUser({ id: parseInt(userId) });
    res.json({ status: true, travels });
  } else {
    const travels = await getTravelByUser(user);
    res.json({ status: true, travels });
  }
};

export const getPhotos = async (req, res) => {
  const user = res.locals.user;
  const userId = req.query.userId;
  if (userId) {
    const photos = await getPhotoByUser({ id: parseInt(userId) });
    res.json({ status: true, photos });
  } else {
    const photos = await getPhotoByUser(user);
    res.json({ status: true, photos });
  }
};
