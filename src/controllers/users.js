import axios from "axios";
import client from "../client.js";
import {
  getUserIdByKakaoId,
  issueJWT,
  isNicknameAvailable,
} from "../utils/users.js";
import { isUserExistsByKakaoId } from "../utils/users.js";

const getKakaoId = async (accessToken) => {
  const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const kakaoId = String(response.data.id);
  return kakaoId;
};

export const loginUser = async (req, res) => {
  const accessToken = req.body.accessToken;
  let kakaoId;
  try {
    kakaoId = await getKakaoId(accessToken);
  } catch (e) {
    res.json({ status: false });
    return;
  }

  const userId = await getUserIdByKakaoId(kakaoId);

  if (userId) {
    const jwt = issueJWT(userId);
    res.json({ status: true, ...jwt });
  } else {
    res.json({ register: false });
  }
};

export const registerUser = async (req, res) => {
  const accessToken = req.body.accessToken;
  let kakaoId;
  try {
    kakaoId = await getKakaoId(accessToken);
  } catch (e) {
    return res.json({ status: false });
  }
  console.log(`kakaoId`, kakaoId);

  if (await isUserExistsByKakaoId(kakaoId)) {
    return res.json({ status: false });
  }

  delete req.body["accessToken"];

  const userId = (
    await client.user.create({
      data: { ...req.body, kakaoId },
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
