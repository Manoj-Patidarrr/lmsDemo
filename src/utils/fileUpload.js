//jshint esversion:11
import multer from "multer";
import path from "path";
import fs from "fs";

export function storage() {
  try {
    let folderName = "./uploads";
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
    let storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./uploads");
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    });
    return storage;
  } catch (err) {
    throw Error(err);
  }
}
