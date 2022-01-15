import client from "../client.js";

export const addBook = async (info) => {
  const { userId, title, body } = info;
  const book = await client.book.create({
    data: {
      userId,
      title,
      body,
    },
  });
  return book;
};

export const addMusic = async (info) => {
  const { userId, title, body } = info;
  const music = await client.music.create({
    data: {
      userId,
      title,
      body,
    },
  });
  return music;
};

export const addTravel = async (info) => {
  const { userId, title, body } = info;
  const travel = await client.travel.create({
    data: {
      userId,
      title,
      body,
    },
  });
  return travel;
};

export const addPhoto = async (info) => {
  const { userId, title, body } = info;
  const photo = await client.photo.create({
    data: {
      userId,
      title,
      body,
    },
  });
  return photo;
};

export const getPhotobyUser = async (user) => {
  const userId = user.id;
  const photos = await client.photo.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      body: true,
    },
  });
  return photos;
};
