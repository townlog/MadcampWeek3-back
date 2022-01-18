import express from "express";
import {
  getMyRooms,
  getRoomId,
  seeRoom,
  sendMessageWithCreation,
} from "../controllers/chat.js";
import { authChecker } from "../middleware/authChecker.js";
import { toAsyncRouter } from "../utils/errors.js";

let router = toAsyncRouter(express.Router());

router.get("/", authChecker, getRoomId);
router.get("/rooms/:id", authChecker, seeRoom);
router.get("/rooms", authChecker, getMyRooms);
router.post("/", authChecker, sendMessageWithCreation);

export default router;
