/*jshint esversion: 9 */

import { register } from "../services/Authentication/register.js";
import { login } from "../services/Authentication/login.js";
import { registerReq } from "./api/model/Request/Register.js";
import { loginReq } from "./api/model/Request/login.js";
import { registerResp } from "./api/model/Response/register.js";
import { loginResp } from "./api/model/Response/login.js";
import { response } from "../utils/response.js";
import { User } from "../models/userDetails.js";
import { email } from "../utils/mailer.js";
// import { update } from "lodash";
import { hash as _hash } from "bcrypt";
import e from "express";


export const entryController = {
  register: async (req, res, next) => {
    console.log("Inside register");
    await register(registerReq(req.body))
      .then((result) => {
        res.json(response(200, "Registration success", registerResp(result)));
      })
      .catch((err) => {
        res.json(response(500, "validation error", {}, true, err.message));
      });
  },

  login: async (req, res, next) => {
    await login(loginReq(req.body))
      .then((result) => {
        res.json(response(200, "Login success", loginResp(result)));
      })

      .catch((err) => {
        console.log("error:", err);
        res.json(response(500, "Validation error", {}, true, err.message));
      });
  },
  
  updateProfile: async (req, res) => {
    try {
      const { emailID, userName, linkedinProfile, changePassword, reEnterPassword } = req.body;

      const match = await User.findOne({ emailID: req.query.emailID })
      if (match) {
        if (!changePassword && !reEnterPassword) {
          const update = await User.updateOne({ emailID: req.query.emailID }, {
            $set: {
              emailID: emailID,
              userName: userName,
              position: req.user.role,
              linkedinProfile: linkedinProfile,

            }
          })
          res.status(200).json({
            message: "update successfully",
            data: update
          })
        } else {
          if (changePassword === reEnterPassword) {
            const password = await _hash(reEnterPassword, 10);
            const updateData = await User.updateOne({ emailID: req.query.emailID }, {
              $set: {
                emailID: emailID,
                userName: userName,
                password: password,
                position: req.user.role,
                linkedinProfile: linkedinProfile,

              }
            })
            res.status(200).json({
              message: "update successfully",
              data: updateData
            })
          }
          else {
            res.status(400).json({
              message: "invalid password",
              data: {}
            })
          }
        }
      } else {
        res.status(400).json({
          message: "invalid emailID",
          data: {}
        })
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "server not found",
        error: err
      })
    }
  },
//   forgotpass:async(req,res)=>{
//     try{
//       const emailID = req.email
//     }catch(err){

//     }
//   }
};
