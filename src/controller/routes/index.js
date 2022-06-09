/*jshint esversion: 9 */

import { authRoute } from "./authentication.js";
import { verifyToken } from "../../Middleware/auth.js";
import { courseRoute } from "./course.js";
import { s3Files } from "./files.js";
import { techRoutes } from "./technology.js";
import { candidateRoute } from "./candidate.js";
import { commentRoute } from "./comments.js";
import { notification_routes } from "./notification.js";
import { taskRoute } from "./task.js";


export function route(router, express) {
  console.log("inside index.js");
  authRoute(router);
  s3Files(router);

  /* token required for below routes */
  router.use(verifyToken);
  commentRoute(router);
  notification_routes(router);
  candidateRoute(router);
  techRoutes(router);
  courseRoute(router);
   taskRoute(router);
  return router;
}
