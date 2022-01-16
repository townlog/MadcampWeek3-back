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

export const getPhotoByUser = async (user) => {
  const userId = user.id;
  const photos = await client.photo.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      body: true,
      likes: {
        select: {
          user: {
            select: {
              nickname: true,
            },
          },
        },
      },
    },
  });
  return photos.map((e) => {
    return { ...e, likes: e.likes.map((it) => it.user.nickname) };
  });
};

export const getMusicByUser = async (user) => {
  const userId = user.id;
  const musics = await client.music.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      body: true,
      likes: {
        select: {
          user: {
            select: {
              nickname: true,
            },
          },
        },
      },
    },
  });
  return musics.map((e) => {
    return { ...e, likes: e.likes.map((it) => it.user.nickname) };
  });
};

export const getBookByUser = async (user) => {
  const userId = user.id;
  const books = await client.book.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      body: true,
      likes: {
        select: {
          user: {
            select: {
              nickname: true,
            },
          },
        },
      },
    },
  });
  return books.map((e) => {
    return { ...e, likes: e.likes.map((it) => it.user.nickname) };
  });
};

export const getTravelByUser = async (user) => {
  const userId = user.id;
  const travels = await client.travel.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      body: true,
      likes: {
        select: {
          user: {
            select: {
              nickname: true,
            },
          },
        },
      },
    },
  });
  return travels.map((e) => {
    return { ...e, likes: e.likes.map((it) => it.user.nickname) };
  });
};

export const likeBook = async (userId, bookId) => {
  await client.bookLike.create({
    data: {
      userId,
      bookId,
    },
  });
};

export const unLikeBook = async (userId, bookId) => {
  await client.bookLike.delete({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
  });
};

export const likeMusic = async (userId, musicId) => {
  await client.musicLike.create({
    data: {
      userId,
      musicId,
    },
  });
};

export const unLikeMusic = async (userId, musicId) => {
  await client.musicLike.delete({
    where: {
      userId_musicId: {
        userId,
        musicId,
      },
    },
  });
};
export const likeTravel = async (userId, travelId) => {
  await client.travelLike.create({
    data: {
      userId,
      travelId,
    },
  });
};

export const unLikeTravel = async (userId, travelId) => {
  await client.travelLike.delete({
    where: {
      userId_travelId: {
        userId,
        travelId,
      },
    },
  });
};
export const likePhoto = async (userId, photoId) => {
  await client.photoLike.create({
    data: {
      userId,
      photoId,
    },
  });
};

export const unLikePhoto = async (userId, photoId) => {
  await client.photoLike.delete({
    where: {
      userId_photoId: {
        userId,
        photoId,
      },
    },
  });
};

export const isBookLike = async (userId, bookId) => {
  const like = await client.bookLike.findUnique({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
  });
  return like !== null;
};

export const isMusicLike = async (userId, musicId) => {
  const like = await client.musicLike.findUnique({
    where: {
      userId_musicId: {
        userId,
        musicId,
      },
    },
  });
  return like !== null;
};

export const isTravelLike = async (userId, travelId) => {
  const like = await client.travelLike.findUnique({
    where: {
      userId_travelId: {
        userId,
        travelId,
      },
    },
  });
  return like !== null;
};

export const isPhotoLike = async (userId, photoId) => {
  const like = await client.photoLike.findUnique({
    where: {
      userId_photoId: {
        userId,
        photoId,
      },
    },
  });
  return like !== null;
};
