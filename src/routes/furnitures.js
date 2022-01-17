import express from "express";
import {
  createBook,
  createMusic,
  createPhoto,
  createTravel,
  deleteBook,
  deleteMusic,
  deletePhoto,
  deleteTravel,
  getBooks,
  getMusics,
  getPhotos,
  getTravels,
  toggleLikeBook,
  toggleLikeMusic,
  toggleLikePhoto,
  toggleLikeTravel,
} from "../controllers/furnitures.js";
import { authChecker } from "../middleware/authChecker.js";
import { wrapAsync } from "../utils/errors.js";
import { multerToS3, uploadFile } from "../utils/image.js";

let router = express.Router();

router.post("/books", authChecker, wrapAsync(createBook));
router.post("/musics", authChecker, wrapAsync(createMusic));
router.post("/travels", authChecker, wrapAsync(createTravel));
router.post(
  "/photos",
  authChecker,
  uploadFile,
  wrapAsync(createPhoto)
);

router.get("/books", authChecker, wrapAsync(getBooks));
router.get("/musics", authChecker, wrapAsync(getMusics));
router.get("/travels", authChecker, wrapAsync(getTravels));
router.get("/photos", authChecker, wrapAsync(getPhotos));

router.post("/books/like", authChecker, wrapAsync(toggleLikeBook));
router.post("/musics/like", authChecker, wrapAsync(toggleLikeMusic));
router.post("/travels/like", authChecker, wrapAsync(toggleLikeTravel));
router.post("/photos/like", authChecker, wrapAsync(toggleLikePhoto));

router.delete("/books", authChecker, wrapAsync(deleteBook));
router.delete("/musics", authChecker, wrapAsync(deleteMusic));
router.delete("/travels", authChecker, wrapAsync(deleteTravel));
router.delete("/photos", authChecker, wrapAsync(deletePhoto));

export default router;
