// jshint esversion:11
import course from "../../models/course.js";
import { upload, deleteFiles } from "../../utils/s3.js";
import fs from "fs";
import util from "util";
import { resolve } from "path";
import mongoose from "mongoose";
const unlinkFile = util.promisify(fs.unlink);

class Course {
  createCourse(courseData, request) {
    return new Promise(async function (resolve, reject) {
      try {
        let result = "";

        if (request.file) {
          result = await upload(request.file);
          await unlinkFile(request.file.path);
        }
       console.log("manu",request.user.userName);
       console.log("manoj",courseData);
        if (courseData.courseName && request.user.userName) {
          const newCourse = new course({
            ...courseData,
            refType: {
              ...courseData.refType,
              fileLink: result.Key,
            },
            author: {
              id: mongoose.Types.ObjectId(request.user.userID), //for matching id convert string to object
              authorName:request.user.userName,
            },
            userActions: {
              likes: {
                count: 0,
                ids: [],
              },
               comments: 0,
            },
          });
          await newCourse
            .save()
            .then((savedData) => resolve(savedData))
            .catch((err) => reject(err.message));
        } else {
          reject("Invalid input. course name or author is missing!");
        }
      } catch (e) {
        console.log(e.message);
        reject(e.message);
      }
    });
  }

  getCourses(courseName) {
    console.log("444444");
    return new Promise(async function (resolve, reject) {
      try {
        let options = courseName ? { courseName } : {};
        let courses = await course.find(options).sort({createdAt:-1}).exec();
        if (courses && courses.length) {
          resolve(courses);
        } else {
          reject("No courses found");
        }
      } catch (e) {
        reject(e.message);
      }
    });
  }
  getCourseById(id) {
    return new Promise(async function (resolve, reject) {
      try {
        
        let courses = await course.find({_id:id}).exec();
        console.log(courses);
        if (courses && courses.length) {
          resolve(courses);
        } else {
          reject("No courses found");
        }
      } catch (e) {
        reject(e.message);
      }
    });
  }

  getCoursesByAuthor(authorId) {
    return new Promise(async function (resolve, reject) {
      try {
        let filteredCourse = await course
          .find({ "author.id": authorId })
          .exec();
        console.log(`course length : ${filteredCourse.length}`);
        if (filteredCourse && filteredCourse.length) {
          resolve(filteredCourse);
        } else {
          resolve("No course found");
        }
      } catch (e) {
        reject(e.message);
      }
    });
  }
  recentCourseById(id) {
    return new Promise(async function (resolve, reject) {
      try {
          let todayDate = new Date();
            let beforeDate = new Date();
            beforeDate.setDate(beforeDate.getDate() - 1);
         let courses = await course.find({$and:[{"author.id":id},{createdAt:{ "$lte": todayDate, "$gte": beforeDate}}]}).exec();
        if (courses && courses.length) {
          resolve(courses);
        } else {
          reject("No courses found");
        }
      } catch (e) {
        reject(e.message);
      }
    });
  }

  updateCourse(courseDetails, _id, file) {
    return new Promise(async function (resolve, reject) {
      try {
        const newFileKey = file.filename;
        let filter = { _id: _id };
        let update = {
          ...courseDetails,
          refType: { ...courseDetails.refType, fileLink: newFileKey },
        };

        console.log("new file key ");
        if (newFileKey) {
          await course
            .findOne({ _id }, { refType: 1 })
            .then(async (result) => {
              console.log(result);
              const oldFileKey = result.refType.fileLink;
              if (newFileKey !== oldFileKey) {
                await deleteFiles(oldFileKey);
                await upload(file);
                await unlinkFile(file.path);
              }
            })
            .catch((err) => console.error(err.message));
        }

        await course
          .updateOne(filter, update, {
            new: true,
          })
          .exec()
          .then((result) => {
            if (result.matchedCount && result.modifiedCount) resolve(result);
            else if (result.matchedCount) reject("No course modified");
            else reject("No course found");
          })
          .catch((err) => reject(err.message));
      } catch (e) {
        reject(e.message);
      }
    });
  }

  deleteCourse(courseID) {
    return new Promise(async function (resolve, reject) {
      try {
        console.log("Inside delete course");
        await course
          .findOne({ _id: courseID })
          .then(async (course) => {
            let key = course.refType.fileLink;

            if (key) {
              await deleteFiles(key);
            }
          })
          .catch((e) => console.log(e.message));

        await course
          .deleteOne({ _id: courseID })
          .exec()
          .then((result) => resolve(result))
          .catch((err) => reject(err.message));
      } catch (e) {
        reject(e.message);
      }
    });
  }

  setUserLikes(courseID, userID, event) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(courseID + " , " + userID + " , " + event);
        if (courseID && userID) {
          let IncLikes = {
              $inc: {
                "userActions.likes.count": 1,
              },
              $addToSet: {
                "userActions.likes.ids": userID,
              },
            },
            decLikes = {
              $inc: {
                "userActions.likes.count": -1,
              },
              $pull: {
                "userActions.likes.ids": userID,
              },
            };

          let updatedResult = await course
            .findOneAndUpdate(
              {
                _id: courseID,
              },
              event ? IncLikes : decLikes,
              { new: true }
            )
            .exec();

          if (updatedResult && Object.keys(updatedResult).length) {
            resolve(updatedResult);
          }
          reject("Invalid input.try again");
        }
        reject("invalid courseID or userID or event value. try again");
      } catch (e) {
        reject(e.message);
      }
    });
  }
  
}

export default Course;
