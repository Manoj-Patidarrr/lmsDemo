//jshint esversion:11
import Comment from "../../models/comments.js";
import Course from "../../models/course.js";

export class Comments {
  createComment(commentDetails) {
    return new Promise(async (resolve, reject) => {
      try {
        if (
          Object.keys(commentDetails).length &&
          (await Course.exists({ _id: commentDetails.courseID }))
        ) {
          await new Comment({
            ...commentDetails,
            likes: { count: 0, users: [] },
          })
            .save()
            .then(async (result) => {
              await Course.findByIdAndUpdate(commentDetails.courseID, {
                $inc: { "userActions.comments": 1 },
              });
              resolve(result);
            })
            .catch((err) => reject(err.message));
        }
        reject("Invalid comment details");
      } catch (e) {
        reject(e.message);
      }
    });
  }

  editComment(commentDetails) {
    return new Promise(async (resolve, reject) => {
      try {
        const id = commentDetails.commentID;
        console.log(commentDetails);
        if (id && typeof id === "string" && id.length > 12) {
          if (!commentDetails.isMsgDiff && commentDetails.likes) {
            console.log("first");
            await Comment.findByIdAndUpdate(id, {
              $inc: { "likes.count": 1 },
              $addToSet: { "likes.users": commentDetails.author.id },
            })
              .then((result) => resolve(result))
              .catch((e) => reject(e.message));
          } else if (!commentDetails.isMsgDiff && !commentDetails.likes) {
            console.log("second");
            await Comment.findByIdAndUpdate(id, {
              $inc: { "likes.count": -1 },
              $pull: { "likes.users": commentDetails.author.id },
            })
              .then((result) => resolve(result))
              .catch((e) => reject(e.message));
          } else {
            console.log("third");
            const update = {
              message: commentDetails.message,
              modifiedAt: Date.now(),
            };
            await Comment.findByIdAndUpdate(id, update, { new: true })
              .exec()
              .then((data) => resolve(data))
              .catch((err) => {
                console.log(err);
                reject(err.message);
              });
          }
        }
        reject("Invalid comment id");
      } catch (e) {
        reject(e.message);
      }
    });
  }

  getCommentByCourseID(courseID) {
    return new Promise(async (resolve, reject) => {
      try {
        if (courseID && typeof courseID === "string" && courseID.length > 12) {
          await Comment.find({ courseID })
            .sort({ _id: -1 })
            .exec()
            .then((result) => resolve(result))
            .catch((err) => reject(err.message));
        }
        reject("Invalid course id");
      } catch (e) {
        reject(e.message);
      }
    });
  }

  deleteComment(commentID) {
    return new Promise(async (resolve, reject) => {
      try {
        if (
          commentID &&
          typeof commentID === "string" &&
          commentID.length > 12
        ) {
          await Comment.deleteOne({ _id: commentID })
            .exec()
            .then((result) => resolve(result))
            .catch((err) => reject(err.message));
        }
        reject("Invalid comment id");
      } catch (e) {
        reject(e.message);
      }
    });
  }
}
