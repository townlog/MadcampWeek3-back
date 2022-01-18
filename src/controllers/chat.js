import {
  getRoomIdDB,
  getRoomsByUserId,
  seeRoomDB,
  sendMessage,
} from "../utils/chat.js";

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

  console.log(req.body);

  if ((await getRoomIdDB(userId, friendId)) !== undefined) {
    return res.json({ status: false });
  }

  const roomId = await sendMessage({ userId, friendId, payload });
  return res.json({ status: true, roomId });
};

export const seeRoom = async (req, res) => {
  const userId = res.locals.user.id;
  const roomId = req.params.id;

  if (roomId === undefined) {
    return res.json({ status: false });
  }

  const room = await seeRoomDB(userId, parseInt(roomId));

  return res.json({ status: true, room });
};

export const getMyRooms = async (req, res) => {
  const userId = res.locals.user.id;

  const rooms = await getRoomsByUserId(userId);

  return res.json({ status: true, rooms });
};
