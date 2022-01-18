import client from "../client.js";

export const getRoomIdDB = async (userId, friendId) => {
  const roomIndex = await client.roomIndex.findFirst({
    where: {
      OR: [
        {
          userAId: userId,
          userBId: friendId,
        },
        {
          userAId: friendId,
          userBId: userId,
        },
      ],
    },
  });

  return roomIndex?.roomId;
};

export const isChamyeoRoom = async (userId, roomId) => {
  const room = await client.room.findFirst({
    where: {
      id: roomId,
      users: {
        some: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
    },
  });
  return room !== null;
};

export const createNewRoomDB = async (userIds) => {
  console.log(`userIds`, userIds);
  const room = await client.room.create({
    data: {
      users: {
        connect: userIds.map((userId) => {
          return { id: userId };
        }),
      },
    },
    select: {
      id: true,
    },
  });

  return room;
};

export const sendMessage = async ({ userId, friendId, roomId, payload }) => {
  if (!roomId) {
    roomId = (await createNewRoomDB([userId, friendId])).id;
    await client.roomIndex.create({
      data: {
        userAId: userId,
        userBId: friendId,
        roomId,
      },
    });
  } else if (!(await isChamyeoRoom(userId, roomId))) {
    return false;
  }

  await client.message.create({
    data: {
      payload,
      user: {
        connect: {
          id: userId,
        },
      },
      room: {
        connect: {
          id: roomId,
        },
      },
    },
  });

  return roomId;
};

export const seeRoomDB = async (userId, roomId) => {
  const room = await client.room.findFirst({
    where: {
      id: roomId,
      users: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      users: {
        select: {
          id: true,
          nickname: true,
        },
      },
      messages: {
        select: {
          user: {
            select: {
              id: true,
              nickname: true,
            },
          },
          payload: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  return room;
};

export const getRoomsByUserId = (userId) => {
  return client.room.findMany({
    where: {
      users: {
        some: { id: userId },
      },
    },
    include: {
      users: {
        select: {
          id: true,
          nickname: true,
        },
      },
    },
  });
};
