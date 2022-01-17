import client from "../client.js";
import {
  addBook,
  addMusic,
  addPhoto,
  addTravel,
  deleteDBBook,
  deleteDBMusic,
  deleteDBPhoto,
  deleteDBTravel,
  getBookByUser,
  getMusicByUser,
  getPhotoByUser,
  getTravelByUser,
  isBookLike,
  isMusicLike,
  isPhotoLike,
  isTravelLike,
  likeBook,
  likeMusic,
  likePhoto,
  likeTravel,
  unLikeBook,
  unLikeMusic,
  unLikePhoto,
  unLikeTravel,
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
  const { title, body } = req.body;

  const photo = await addPhoto({ userId, title, body });
  const photoId = photo.id;
  req.files.forEach(async (e) => {
    const image = e.location;
    await client.photoImage.create({
      data: {
        photoId,
        image,
      },
    });
  });
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

export const toggleLikeBook = async (req, res) => {
  const userId = res.locals.user.id;
  const bookId = req.body.bookId;

  if (await isBookLike(userId, bookId)) {
    await unLikeBook(userId, bookId);
  } else {
    await likeBook(userId, bookId);
  }

  return res.json({ status: true });
};

export const toggleLikeMusic = async (req, res) => {
  const userId = res.locals.user.id;
  const musicId = req.body.musicId;

  if (await isMusicLike(userId, musicId)) {
    await unLikeMusic(userId, musicId);
  } else {
    await likeMusic(userId, musicId);
  }

  return res.json({ status: true });
};

export const toggleLikeTravel = async (req, res) => {
  const userId = res.locals.user.id;
  const travelId = req.body.travelId;

  if (await isTravelLike(userId, travelId)) {
    await unLikeTravel(userId, travelId);
  } else {
    await likeTravel(userId, travelId);
  }

  return res.json({ status: true });
};

export const toggleLikePhoto = async (req, res) => {
  const userId = res.locals.user.id;
  const photoId = req.body.photoId;

  if (await isPhotoLike(userId, photoId)) {
    await unLikePhoto(userId, photoId);
  } else {
    await likePhoto(userId, photoId);
  }

  return res.json({ status: true });
};

export const deletePhoto = async (req, res) => {
  const userId = res.locals.user.id;
  const photoId = req.body.photoId;

  const photo = await client.photo.findUnique({
    where: {
      id: photoId,
    },
  });

  if (photo?.userId === userId) {
    await deleteDBPhoto(photoId);
    return res.json({ status: true });
  } else {
    return res.json({ status: false });
  }
};

export const deleteMusic = async (req, res) => {
  const userId = res.locals.user.id;
  const musicId = req.body.musicId;

  const music = await client.music.findUnique({
    where: {
      id: musicId,
    },
  });

  if (music?.userId === userId) {
    await deleteDBMusic(musicId);
    return res.json({ status: true });
  } else {
    return res.json({ status: false });
  }
};

export const deleteTravel = async (req, res) => {
  const userId = res.locals.user.id;
  const travelId = req.body.travelId;

  const travel = await client.travel.findUnique({
    where: {
      id: travelId,
    },
  });

  if (travel?.userId === userId) {
    await deleteDBTravel(travelId);
    return res.json({ status: true });
  } else {
    return res.json({ status: false });
  }
};

export const deleteBook = async (req, res) => {
  const userId = res.locals.user.id;
  const bookId = req.body.bookId;

  const book = await client.book.findUnique({
    where: {
      id: bookId,
    },
  });

  if (book?.userId === userId) {
    await deleteDBBook(bookId);
    return res.json({ status: true });
  } else {
    return res.json({ status: false });
  }
};

export const isLikedPhoto = async (req, res) => {
  const userId = res.locals.user.id;
  const photoId = req.query.id;

  if (photoId) {
    return res.json({
      status: true,
      liked: await isPhotoLike(userId, parseInt(photoId)),
    });
  }

  return res.json({ status: false });
};

export const isLikedMusic = async (req, res) => {
  const userId = res.locals.user.id;
  const musicId = req.query.id;

  if (musicId) {
    return res.json({
      status: true,
      liked: await isMusicLike(userId, parseInt(musicId)),
    });
  }

  return res.json({ status: false });
};

export const isLikedBook = async (req, res) => {
  const userId = res.locals.user.id;
  const bookId = req.query.id;

  if (bookId) {
    return res.json({
      status: true,
      liked: await isBookLike(userId, parseInt(bookId)),
    });
  }

  return res.json({ status: false });
};
