import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import AWS from "aws-sdk";
import { v4 } from "uuid";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3 = new AWS.S3();

export const multerToS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: "breakall",
    key: function (req, file, cb) {
      const extension = path.extname(file.originalname);
      cb(null, v4() + extension);
    },
    acl: "public-read-write",
  }),
});

export const uploadFile = (req, res, next) => {
  const upload = multerToS3.array("images", 10);

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.json({ status: false, message: err.message });
    } else if (err) {
      return res.json({ status: false, message: err });
    }
    next();
  });
};
