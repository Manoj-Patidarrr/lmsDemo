//jshint esversion: 11
import mongoose from "mongoose";
import CourseService from "../services/course/Course.js";
import { courseReq } from "../controller/api/model/Request/course.js";
import { courseResp } from "../controller/api/model/Response/course.js";
import { recentCourseResp } from "../controller/api/model/Response/recentCourseResp.js";
import { response } from "../utils/response.js";
import { uploadCourses } from "../services/course/courseUpload.js";

export const courseControler = {
  createCourse: async (req, res, next) => {
    let finalResp,
      role = req.user.role
    if (
      [
        "FT-HR",
        "FT-Designer",
        "FT-Developer",
        "FT-Tester",
        "FT-Manager",

      ].includes(role)
    ) {
      await new CourseService()
        .createCourse(courseReq(req.body), req)
        .then(
          (result) =>
          (finalResp = response(
            200,
            "course creation - success",
            courseResp(result, req.user.userID)
          ))
        )
        .catch(
          (err) =>
            (finalResp = response(500, "validation error", {}, true, err))
        );
    } else {
      console.log("data");
      finalResp = response(401, "Validation error", {}, true, {
        message: "Given user is not authorized to create course",
      });
    }
    res.json(finalResp);
  },
 getCourses: async (req, res, next) => {
    let finalResp;
    await new CourseService()
      .getCourses(req.query.filter)
      .then(
        (result) =>
        (finalResp = response(
          200,
          "course list",
          result.map((element) => courseResp(element, req.user.userID))
        ))
      )
      .catch(
        (err) => (finalResp = response(500, "validation error", {}, true, err))
      );


    res.json(finalResp);
  },
   getCourseById: async (req, res, next) => {
    let finalResp;
    const id = mongoose.Types.ObjectId(req.query.id)
    await new CourseService()
      .getCourseById(id)
      .then(
        (result) =>
        (finalResp = response(
          200,
          "course list",
          result.map((element) => courseResp(element, req.user.userID))
        ))
      )
      .catch(
        (err) => (finalResp = response(500, "validation error", {}, true, err))
      );
    res.json(finalResp);
  },
  recentCourseById: async (req, res, next) => {
    let finalResp;
    const id = mongoose.Types.ObjectId(req.query.id)
    await new CourseService()
      .recentCourseById(id)
      .then(
        (result) =>
        (finalResp = response(
          200,
          "recent course created by author",
          result.map((element) => recentCourseResp(element, req.user.userID))
        ))
      )
      .catch(
        (err) => (finalResp = response(500, "validation error", {}, true, err))
      );
    res.json(finalResp);
  },

  getCourseByAuthor: async (req, res, next) => {
    let finalResp;
    await new CourseService()
      .getCoursesByAuthor(req.user.userID)
      .then(
        (result) =>
        (finalResp = response(
          200,
          "author course listed successfully",
          result.map((data) => courseResp(data, req.user.userID))
        ))
      )
      .catch(
        (err) => (finalResp = response(500, "Validation error", {}, true, err))
      );
    res.json(finalResp);
  },

  updateCourse: async (req, res, next) => {
    let finalResp;
    await new CourseService()
      .updateCourse(courseReq(req.body), req.body.courseID, req.file)
      .then(
        (result) =>
          (finalResp = response(200, "course edited successfully", result))
      )
      .catch(
        (err) => (finalResp = response(500, "Validation error", {}, true, err))
      );
    res.json(finalResp);
  },

  deleteCourse: async (req, res, next) => {
    let finalResp;
    if(req.user.role === "FT-HR"){
    await new CourseService()
      .deleteCourse(req.query.id)
      .then(
        (result) =>
          (finalResp = response(200, "course delete successfully", result))
      )
      .catch(
        (err) => (finalResp = response(500, "Validation error", {}, true, err))
      );
    }else{
      console.log("data");
      finalResp = response(401, "Validation error", {}, true, {
        message: "you are not authorized to delete course",
      });
    }
    res.json(finalResp);
  },

  excelCourseUpload: async (req, res, next) => {
    let finalResp;
    console.log(req.file);
    await uploadCourses(req.file.path)
      .then((result) => {
        finalResp = result;
      })
      .catch((err) => {
        finalResp = err;
      });
    res.json(finalResp);
  },

  setUserLikes: async (req, res, next) => {
    let finalResp;
    let { courseID, event } = req.body;
    await new CourseService()
      .setUserLikes(courseID, req.user.userID, event)
      .then((result) => (finalResp = result))
      .catch((err) => (finalResp = err));
    res.json(finalResp);
  },


};
