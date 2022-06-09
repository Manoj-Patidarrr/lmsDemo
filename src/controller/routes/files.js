// jshint esversion:11

import { s3Controller } from "../s3_controller.js";

export function s3Files(router) {
  router
    .route("/files/:key")
    .get(s3Controller.getFilesByKey)
    .delete(s3Controller.deleteFilesByKey);

  router.route("/files").get(s3Controller.getAllBucketFiles);
}
