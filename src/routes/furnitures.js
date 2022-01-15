import express from "express";
import {
  createBook,
  createMusic,
  createPhoto,
  createTravel,
  getPhotos,
} from "../controllers/furnitures.js";
import { authChecker } from "../middleware/authChecker.js";
import { toAsyncRouter } from "../utils/errors.js";

let router = toAsyncRouter(express.Router());

router.post("/books", authChecker, createBook);
router.post("/musics", authChecker, createMusic);
router.post("/travels", authChecker, createTravel);
router.post("/photos", authChecker, createPhoto);
router.get("/photos", authChecker, getPhotos);



export default router;
