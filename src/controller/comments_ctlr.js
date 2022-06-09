//jshint esversion:11
import { Comments } from "../services/course/comments.js";
import { response } from "../utils/response.js";
import { commentReq } from "../controller/api/model/Request/commentReq.js";
import { commentResp } from "../controller/api/model/Response/comments.js";

export const commentCtrl = {
  addComment: async (req, res, next) => {
    let finalResp;
    await new Comments()
      .createComment(
        commentReq({
          ...req.body,
          userID: req.user.userID,
          username: req.user.userName,
        })
      )
      .then(
        (result) =>
          (finalResp = response(
            200,
            "comment created successfully",
            commentResp(result)
          ))
      )
      .catch(
        (err) => (finalResp = response(500, "Validation error", {}, true, err))
      );

    res.json(finalResp);
  },
  editComment: async (req, res, next) => {
    let finalResp;
    await new Comments()
      .editComment(
        commentReq({
          ...req.body,
          userID: req.user.userID,
          username: req.user.userName,
        })
      )
      .then(
        (result) =>
          (finalResp = response(
            200,
            "comment edited successfully",
            commentResp(result)
          ))
      )
      .catch(
        (err) => (finalResp = response(500, "Validation error", {}, true, err))
      );

    res.json(finalResp);
  },
  listComment: async (req, res, next) => {
    let finalResp;
    await new Comments()
      .getCommentByCourseID(req.query.courseID)
      .then(
        (result) =>
          (finalResp = response(
            200,
            "comment listed successfully",
            result.map((d) => commentResp(d))
          ))
      )
      .catch(
        (err) => (finalResp = response(500, "Validation error", {}, true, err))
      );

    res.json(finalResp);
  },
  deleteComment: async (req, res, next) => {
    let finalResp;
    await new Comments()
      .deleteComment(req.query.commentID)
      .then(
        (result) =>
          (finalResp = response(200, "comment deleted successfully", result))
      )
      .catch(
        (err) => (finalResp = response(500, "Validation error", {}, true, err))
      );

    res.json(finalResp);
  },
};
