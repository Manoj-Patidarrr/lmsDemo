//jshint esversion:11
import jwt from "jsonwebtoken";
import { response } from "../utils/response.js";
import { User } from "../models/userDetails.js";

export async function verifyToken(req, res, next) {
  try {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers.authorization.split(" ")[1];

    let isTokenExist = await User.exists({ token: token });

    if (!token && isTokenExist) {
      res.json(response(403, {}, "A token required for authendication"));
    }
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decoded;
    console.log("checking", decoded);
    console.log("auth success :)");
    next();
  } catch (e) {
    return res.json(response(500, {}, e.message));
  }
}
