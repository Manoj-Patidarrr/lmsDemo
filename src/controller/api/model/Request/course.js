//jshint esversion:11

export function courseReq(request) {
  return Object.freeze({
    _id: request.courseID,
    courseName: request.courseName ?? "",
    courseDescription: request.courseDescription ?? "",
    refType: {
      blog: request.blog ?? "",
      video: request.video ?? "",
      other: request.other ?? "",
    },
    level: request.level ?? "",
    userActions: { likes: 0, comments: 0 },
    week: request.week,
  });
}
