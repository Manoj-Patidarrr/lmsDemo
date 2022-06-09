//jshint  esversion:11

export function commentReq(request) {
  console.log(request);
  return Object.freeze({
    commentID: request.commentID,
    message: request.message,
    courseID: request.courseID,
    author: { id: request.userID ?? "", name: request.username ?? "" },
    likes: request.likes,
    isMsgDiff: request.isMsgDiff ?? false,
  });
}
