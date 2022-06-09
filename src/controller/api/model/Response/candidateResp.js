//jshint esversion:11

export function candidResp(result) {
  return Object.freeze({
    id: result._id,
    username: result.userName,
    emailID:result.emailID,
    password:result.password,
    designation: result.designation,
    skills: result.skills,
    createdCourses: result.courseCount,
    courseAccess: result.courseAccess,
    status: result.status,
    technology: result.technology,  
    dateOfJoining:result.dateOfJoining,
    token:result.token
  });
}
