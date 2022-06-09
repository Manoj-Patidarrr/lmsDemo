//jshint esversion:11

export function commentResp(result) {
  return Object.freeze({
    commentID: result._id,
    message: result.message,
    likes: result.likes.count,
    user: result.author.name,
    createdAt: result.createdAt,
    isCurrentUserLiked: result.likes.users.includes(result.author.id),
  });
}
