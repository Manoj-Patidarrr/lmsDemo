//jshint esversion:9

export function courseResp(result, user) {
  console.log(result.userActions);
  let userLikesIDs = result.userActions.likes.ids;
  return Object.freeze({
    courseID: result._id,
    courseName: result.courseName,
    courseDescription: result.courseDescription,
    refType: result.refType,
    author: result.author.authorName,
    level: result.level,
    week: result.week,
    createdAt: result.createdAt,
    userActions: result.userActions,
  
    isCurrentUserLiked: userLikesIDs.length
      ? userLikesIDs.includes(user)
      : false,
  });
}
