//jshint esversion:11

export function candidateReq(request) {
  return Object.freeze({
    _id: request.id,
    userName: (request.firstName ?? "")+ (" ") + (request.lastName ?? ""),
    emailID: request.emailID.toLowerCase() ?? "",
    dateOfJoining: request.dateOfJoining ?? Date.now(),
    designation: request.designation ?? "",
    skills: request.skills ?? "",
    technology: request.technology ?? "",
    startDate: request.startDate ?? "",
    courseAccess: request.courseAccess
      ? request.courseAccess.trim() === "Allow"
        ? true
        : false
      : false,
  
   });
}
