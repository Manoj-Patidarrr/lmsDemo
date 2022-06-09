//jshint esversion:11
import { commentCtrl } from "../comments_ctlr.js";

export function commentRoute(router) {
  router
    .route("/comment")
    .get(commentCtrl.listComment)
    .post(commentCtrl.addComment)
    .put(commentCtrl.editComment)
    .delete(commentCtrl.deleteComment);
}
