/*jshint esversion: 9 */

import { entryController } from "../entry.js";

import { verifyToken } from "../../Middleware/auth.js"


export function authRoute(router) {
  router.route("/login").post(entryController.login);
  router.route("/register").post(entryController.register);
  router.route("/updateProfile").post(verifyToken, entryController.updateProfile);
}
