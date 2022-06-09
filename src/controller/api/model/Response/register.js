/*jshint esversion: 9 */

export function registerResp(result) {
  return Object.freeze({
    username: result.userName,
    emailID: result.emailID,
    token: result.token,
  });
}
