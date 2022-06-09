// jshint esversion:11

import { User } from "../models/userDetails.js";

class UserDetails {
  editUser(userDetails, userID) {
    return new Promise(async (resolve, reject) => {
      try {
        let filter = { _id: userID };
        let update = { userDetails };

        let updatedUser = await User.findOneAndUpdate(filter, update, {
          new: true,
        }).exec();
        if (updatedUser) {
          resolve(updatedUser);
        } else {
          reject("No user found");
        }
      } catch (e) {
        reject(e.message);
      }
    });
  }

  deleteUser(userID) {
    return new Promise(async (resolve, reject) => {
      try {
        let deletedResult = await User.findByIdAndDelete(userID).exec();
        resolve(deletedResult);
      } catch (e) {
        reject(e.message);
      }
    });
  }
}

export default UserDetails;
