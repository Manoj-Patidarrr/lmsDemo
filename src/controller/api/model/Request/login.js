/*jshint esversion: 9 */

export function loginReq(request) {
  return Object.freeze({
    emailID: request.emailID ?? "",
    password: request.password ?? "",
    
  });
}
