//jshint esversion:11

import { candid_ctrl } from "../candid_ctl.js";


export function candidateRoute(router) {
  router
    .route("/favourites")
    .get(candid_ctrl.getUserFavCourses)
    .put(candid_ctrl.updateFavorites);

  router

    .route("/candidate")
    .get(candid_ctrl.listCandidate)
    .post(candid_ctrl.addCandidate)
    .put(candid_ctrl.editCandidate)
    .delete(candid_ctrl.deleteCandidate);

  router.route("/candidates").get(candid_ctrl.listCandidates);
}
