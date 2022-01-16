import client from "../client.js";
import {
  issueJWT,
  isNicknameAvailable,
  getUserByLogin,
} from "../utils/users.js";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
  const { loginId, loginPw } = req.body;

  const user = await getUserByLogin({ loginId });

  if (!user) {
    return res.json({ status: false, register: false });
  }

  if (await bcrypt.compare(loginPw, user?.loginPw)) {
    const jwt = issueJWT(user.id);
    res.json({ status: true, ...jwt });
  } else {
    res.json({ status: false });
  }
};

export const registerUser = async (req, res) => {
  const { loginPw } = req.body;
  const hashedPassword = await bcrypt.hash(loginPw, 10);

  const userId = (
    await client.user.create({
      data: { ...req.body, loginPw: hashedPassword },
      select: { id: true },
    })
  ).id;
  const jwt = issueJWT(userId);
  res.json({ status: true, ...jwt });
};

export const getMe = async (req, res) => {
  const user = res.locals.user;
  return res.json({ status: true, user });
};

export const checkNickname = async (req, res) => {
  const nickname = req.query.nickname;
  if (nickname == null) {
    return res.json({ status: false });
  }
  return res.json({ status: await isNicknameAvailable(nickname) });
};
