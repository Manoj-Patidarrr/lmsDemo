// jshint esversion:11

import { User } from "../../models/userDetails.js";
import jwt from "jsonwebtoken";
import { hash as _hash } from "bcrypt";
import { email } from "../../utils/mailer.js";

const saltRounds = 10;

export async function register(userDetails) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Inside register services");
      let excryptedPwd = "";
      console.log(userDetails.password);
      _hash(userDetails.password, saltRounds, async function (err, hash) {
        if (err) {
          console.log(err);
        }
        excryptedPwd = hash;
        console.log(process.env.PRIVATE_KEY);
        let jwtToken =
          jwt.sign(
            {
              emailID: userDetails.emailID,
              role: userDetails.role,
              userName: userDetails.userName,
              
            },
            process.env.PRIVATE_KEY,
            {
              expiresIn: "100d",
            }
          ) ?? "";

        const user = new User({
          ...userDetails,
          password: excryptedPwd,
          token: jwtToken,
        });

        await user
          .save()
          .then((res) => {
            console.log(res);
            let message = `Your account has been created at shethink successfully. use below credentials to login
              <br>
              email_ID: ${res.emailID}
              <br>
              password: ${userDetails.password}
            `;
            email(res.emailID, "User Credentials", res.userName, message);
            console.log("user saved successfully");
            resolve(res);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    } catch (e) {
      console.log(e);
      reject(e.message);
    }
  });
}
