//jshint esversion:11

import { notification_ctrl } from "../notification_ctl.js";

export function notification_routes(router) {
  router
    .route("/notification")
    .get(notification_ctrl.listNotification)
    .post(notification_ctrl.createNotification)
    .delete(notification_ctrl.deleteNotification);

  router
    .route("/entity")
    .get(notification_ctrl.listEntity)
    .post(notification_ctrl.createEntity)
    .put(notification_ctrl.editEntity)
    .delete(notification_ctrl.deleteEntity);

  router
    .route("/entityType")
    .get(notification_ctrl.listEntityType)
    .post(notification_ctrl.createEntityType)
    .put(notification_ctrl.editEntityType)
    .delete(notification_ctrl.deleteEntityType);
}
