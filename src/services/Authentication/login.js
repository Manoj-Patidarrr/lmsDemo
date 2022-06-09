/*jshint esversion: 11 */
import { User } from "../../models/userDetails.js";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

export function login(authData) {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne(
        { emailID: authData.emailID },
        { _id: 1, token: 1, password: 1, designation: 1, userName: 1 }
      );

      console.log(
        "req pass : " + authData.password,
        "user pass : " + user.password
      );
      if (user) {
        compare(authData.password, user.password, async (err, result) => {
          if (err || !result) {
            console.error(err || result);
            reject("Invalid Password");
          }
          let jwtToken =
            jwt.sign(
              {
                emailID: user.emailID,
                userID: user._id,
                role: user.designation,
                userName: user.userName,
          
              },
              process.env.PRIVATE_KEY,
              {
                expiresIn: "100d",
              }
            ) ?? "";
          const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
              token: jwtToken,
            },
            { new: true }
          );
          resolve(updatedUser);
        });
      }
    } catch (e) {
      reject("error occured while login");
    }
  });
}
