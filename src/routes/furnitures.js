import express from "express";
import {
  createBook,
  createMusic,
  createPhoto,
  createTravel,
  getBooks,
  getMusics,
  getPhotos,
  getTravels,
} from "../controllers/furnitures.js";
import { authChecker } from "../middleware/authChecker.js";
import { toAsyncRouter } from "../utils/errors.js";

let router = toAsyncRouter(express.Router());

router.post("/books", authChecker, createBook);
router.post("/musics", authChecker, createMusic);
router.post("/travels", authChecker, createTravel);
router.post("/photos", authChecker, createPhoto);

router.get("/books", authChecker, getBooks);
router.get("/musics", authChecker, getMusics);
router.get("/travels", authChecker, getTravels);
router.get("/photos", authChecker, getPhotos);

export default router;
