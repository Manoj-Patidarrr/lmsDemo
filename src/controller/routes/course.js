//jshint esversion:11

import { courseControler } from "../course_controller.js";
import { storage } from "../../utils/fileUpload.js";
import multer from "multer";

let upload = multer({
  storage: storage(),
  limits: { fileSize: 1024 * 1024 * 6 },
});

export function courseRoute(router) {
  router
    
  .use(upload.single("files"))
    .route("/course")
    .get(courseControler.getCourses)
    .post(courseControler.createCourse)
    .put(courseControler.updateCourse)
    .delete(courseControler.deleteCourse);

  router.route("/course/likes").post(courseControler.setUserLikes);

  router.route("/authorcourses").get(courseControler.getCourseByAuthor);
  router.route("/listCourseById").get(courseControler.getCourseById);//get course by ID
  router.route("/recentCoursebyId").get(courseControler.recentCourseById);  

  router
    .use(upload.single("files"))
    .route("/courseupload")
    .post(courseControler.excelCourseUpload);
}
