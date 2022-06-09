/*jshint esversion: 11 */

export function response(...args) {
  return {
    code: args[0],
    message: args[1],
    data: args[2],
    error: args[3] ?? false,
    errors: args[4],
  };
}
