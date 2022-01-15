import express from "express";
import {
  createBook,
  createMusic,
  createPhoto,
  createTravel,
} from "../controllers/furnitures.js";
import { authChecker } from "../middleware/authChecker.js";
import { toAsyncRouter } from "../utils/errors.js";

let router = toAsyncRouter(express.Router());

router.post("/", authChecker, createBook);
router.post("/", authChecker, createMusic);
router.post("/", authChecker, createTravel);
router.post("/", authChecker, createPhoto);

export default router;
