import { getRoomIdDB, sendMessage } from "../utils/chat.js";

export const getRoomId = async (req, res) => {
  const userId = res.locals.user.id;
  const friendId = req.query.friendId;

  if (!friendId) {
    return res.json({ status: false, mesagge: "FriendId is needed!" });
  }

  return res.json({
    status: true,
    roomId: await getRoomIdDB(userId, parseInt(friendId)),
  });
};

export const sendMessageWithCreation = async (req, res) => {
  const userId = res.locals.user.id;
  const { friendId, payload } = req.body;

  if ((await getRoomIdDB(userId, friendId)) === undefined) {
    return res.json({ status: false });
  }
  const roomId = await sendMessage({ userId, friendId, payload });
  return res.json({ status: true, roomId });
};
