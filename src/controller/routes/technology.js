
import { techController } from "../technology_ctl.js";

export function techRoutes(router) {
  router
    
    .route("/technology")
    .get(techController.listTechnology)
    .post(techController.createTechnology)
    .put(techController.editTechnology)
    .delete(techController.deleteTechnology);
}
