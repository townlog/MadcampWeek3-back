import express from "express";
import { getRoomId, sendMessageWithCreation } from "../controllers/chat.js";
import { authChecker } from "../middleware/authChecker.js";
import { toAsyncRouter } from "../utils/errors.js";

let router = toAsyncRouter(express.Router());

router.get("/", authChecker, getRoomId);
router.post("/", authChecker, sendMessageWithCreation);

export default router;
