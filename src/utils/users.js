import jwt from "jsonwebtoken";
import client from "../client.js";

export const getUserIdByKakaoId = async (kakaoId) => {
  const user = await client.user.findUnique({
    where: {
      kakaoId,
    },
    select: {
      id: true,
    },
  });

  return user?.id;
};

export const isUserExistsByUserId = async (userId) => {
  const user = await client.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });
  return user !== null;
};

export const isUserExistsByKakaoId = async (kakaoId) => {
  const user = await client.user.findUnique({
    where: { kakaoId },
    select: { id: true },
  });
  return user !== null;
};

export const getUserByJWT = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({
      where: { id },
      select: {
        id: true,
        nickname: true,
      },
    });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const issueJWT = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
  return {
    token,
  };
};

export const isNicknameAvailable = async (nickname) => {
  const user = await client.user.findFirst({
    where: {
      nickname,
    },
    select: {
      id: true,
    },
  });
  return user === null;
};
