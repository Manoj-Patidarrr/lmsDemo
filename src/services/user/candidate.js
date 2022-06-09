//jshint esversion: 11

import { User } from "../../models/userDetails.js";
import { hash as _hash } from "bcrypt";
import { email } from "../../utils/mailer.js";
import jwt from "jsonwebtoken";
import generator from "generate-password";
import course from "../../models/course.js";

const saltRounds = 10;

export class Candidate {
  addCandidate(userDetails) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("Inside add candidate");
        let excryptedPwd = "",
          password = generator.generate({
            length: 12,
            symbols:false,
            numbers: true,
          });
       // console.log(password);
        //encrypting password using bcrypt
        _hash(password, saltRounds, async function (err, hash) {
          if (err) {
            reject(err);
          }
          excryptedPwd = hash;
          console.log(hash);

          console.log(userDetails);
          //jsonwebtoken generation
          let jwtToken =
            jwt.sign(
              {
                emailID: userDetails.emailID,
                role: userDetails.role,
                userName: userDetails.userName,
                password:password  
              },
              process.env.PRIVATE_KEY,
              {
                expiresIn: "100d",
              }
            ) ?? "";

          //creating user instance
          const user = new User({
            ...userDetails,
            password: excryptedPwd,
            token: jwtToken,
          });

          //saving user in db
          await user
            .save()
            .then((res) => {
              let message = `Your account has been created at shethink successfully. use below credentials to login
              <br>
              <br>
              <b>
              email_ID:</b> ${res.emailID}
              <br>
              <b>
              password:</b> ${password}
              
              <br>
            `;
              email(res.emailID, "User Credentials", res.userName, message);
              console.log("user saved successfully");
              resolve(res);
            })
            .catch((err) => reject(err.message));
        });
      } catch (e) {
        console.log(e);
        reject(e.message);
      }
    });
  }

  editCandidate(candidate, _id) {
    return new Promise(async (resolve, reject) => {
      try {
        if (_id) {
          let filter = { _id },
            update = { ...candidate };
          await User.findOneAndUpdate(filter, update, { new: true })
            .exec()
            .then((updatedUser) => resolve(updatedUser))
            .catch((err) => reject(err.message));
        }
        reject("Invalid id. please provide valid candidate id");
      } catch (e) {
        reject(e.message);
      }
    });
  }

  listCandidate(id) {
    return new Promise(async (resolve, reject) => {
      try {
         console.log("wdwd",id);
        if (id) {
           await User.findById({ _id: id  })
            .exec()
            .then((user) => {
              if (user && Object.keys(user).length !== 0) {
                resolve(user);
              }
              resolve("No user found");
            })
            .catch();
        }
        reject("Invalid candidate id");
      } catch (e) {
        console.log(e);
        reject(e.message);
      }
    });
  }

  listCandidates(designation) {
    return new Promise(async (resolve, reject) => {
      console.log("checking designation", designation);
      try {
        await User.aggregate([
          {
            $match: {
              designation: { $regex: `^${designation}`, $options: "$i" }
            }
          },
          {
            $lookup: {
              from: 'courses',
              localField: '_id',
              foreignField: 'author.id',
              as: 'createCourses'
            }
          }, {
            $addFields: {
              courseCount: { $size: "$createCourses" }
            }
          },
          {
          $sort :{
            createdAt:-1 
           }
          }
        
        ])
          .exec()
          .then((users) => {
            console.log(users);
            if (users.length) {
              resolve(users);
            }
            resolve("No user found");
          })
          .catch((e) => {
            reject(e.message);
          });
      } catch (e) {
        reject(e.message);
      }
    });
  }

  deleteCandidate(candidateID) {
    return new Promise(async (resolve, reject) => {
      try {
        let filter = { _id: candidateID };
        await User.deleteOne(filter)
          .exec()
          .then((deletedResp) => resolve(deletedResp))
          .catch((err) => reject(err.message));
      } catch (e) {
        reject(e.message);
      }
    });
  }

  updateFavouriteList(courseID, userID, event) {
    console.log(courseID + ", " + userID + ", " + event);
    return new Promise(async (resolve, reject) => {
      try {
        if (courseID && userID && courseID.length > 10 && userID.length > 10) {
          let filter = { _id: userID },
            update = event
              ? { $addToSet: { "favourites.courseIds": courseID } }
              : { $pull: { "favourites.courseIds": courseID } };

          const _updateFav = await User.findOneAndUpdate(filter, update, {
            new: true,
          });

          if (_updateFav && Object.keys(_updateFav).length) {
            resolve(_updateFav);
          }
          resolve("Invalid data");
        }
        reject("Invalid course id or user id. try again");
      } catch (e) {
        reject(e.message);
      }
    });
  }

  getUserfavCourses(userID) {
    return new Promise(async (resolve, reject) => {
      try {
        if (userID && typeof userID === "string" && userID.length) {
          let userFavourites = await User.findOne({ _id: userID })
            .select({ favourites: 1, _id: 0 })
            .exec();

          if (userFavourites && Object.keys(userFavourites).length) {
            let result = [];
            for (
              let i = 0;
              i < userFavourites.favourites.courseIds.length;
              i++
            ) {
              result.push(
                await course
                  .findOne({ _id: userFavourites.favourites.courseIds[i] })
                  .select({ courseName: 1, courseDescription: 1, author: 1 })
                  .exec()
              );
            }
            resolve(result);
          }

          resolve("No favourites found");
        }
        reject("Invalid userId");
      } catch (e) {
        console.log("error",e);
        reject(e.message);
      }
    });
  }
}
