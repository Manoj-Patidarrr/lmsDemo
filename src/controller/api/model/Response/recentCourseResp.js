//jshint esversion:9

export function recentCourseResp(result, user) {
    console.log(result.userActions);
    let userLikesIDs = result.userActions.likes.ids;
    return Object.freeze({
        courseName: result.courseName,
        courseDescription: result.courseDescription,
        refType: result.refType,
        level: result.level,
        week: result.week,
       createdAt: result.createdAt,
       
    });
}
