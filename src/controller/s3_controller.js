//jshint esversion:11
import { getFileStream, deleteFiles, listBucketFiles } from "../utils/s3.js";

export const s3Controller = {
  getAllBucketFiles: async (req, res, next) => {
    const filesInBucket = await listBucketFiles();
    res.send(filesInBucket);
  },

  getFilesByKey: async (req, res, next) => {
    console.log(req.params.key);
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
  },

  deleteFilesByKey: async (req, res, next) => {
    const result = await deleteFiles(req.params.key);
    res.json({ message: "file deleted successfully" });
  },
};
