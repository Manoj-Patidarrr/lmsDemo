/*jshint esversion:11 */
import generator from "generate-password";

export function registerReq(request) {
  return Object.freeze({
    userName: request.userName ?? "",
    emailID: request.emailID.toLowerCase() ?? "",
    dateOfJoining: request.dateOfJoining,
    password:
      request.password ??
      generator.generate({ length: 12, symbols: true, numbers: true }),
    technology: request.technology ?? [],
    designation: request.role ?? "Intern",
    courseAccess: request.courseAccess.trim() === "Allow" ? true : false,
    //
 
  });
}
