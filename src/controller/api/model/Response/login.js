/*jshint esversion: 9 */

export function loginResp(result) {
  return Object.freeze({
    username: result.userName,
    desgination: result.designation,
    token: result.token,
  });
}
