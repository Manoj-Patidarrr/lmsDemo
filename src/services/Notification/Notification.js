//jshint esversion:11
import Notification from "../../models/Notification.js";
import entity from "../../models/entity.js";
import entityType from "../../models/entityType.js";
import { notifyResp } from "../../controller/api/model/Response/notifyResp.js";

export default class NotificationService {
  createNotification(details) {
    //create notification logic
    return new Promise(async (resolve, reject) => {
      try {
        if (
          details &&
          Object.keys(details).length &&
          details.entityID &&
          details.entityTypeID &&
          (await entity.exists({ _id: details.entityID })) &&
          (await entityType.exists({ _id: details.entityTypeID }))
        ) {
          await new Notification({
            ...details,
          })
            .save()
            .then((result) => resolve(result))
            .catch((err) => reject(err.message));
        }
        reject("Invalid Notification input");
      } catch (e) {
        reject(e.message);
      }
    });
  }

  listNotification(notifier_id) {
    //get notifier notification
    return new Promise(async (resolve, reject) => {
      try {
        const notifications = await Notification.find().exec();
        if (notifications && notifications.length) {
          let resp = await Promise.all(
            notifications.map(async (d) => await notifyResp(d))
          );
          resolve(resp);
        } else {
          resolve("No notifications found");
        }
      } catch (e) {
        reject(e.message);
      }
    });
  }

  deleteNotification(notifier_id) {
    //delete notification logic
    return new Promise(async (resolve, reject) => {
      try {
        const deletedResult = await Notification.deleteMany({
          notifier: notifier_id,
        }).exec();
        if (deletedResult) {
          resolve(deletedResult);
        } else {
          reject(
            "Something wrong while deleting notifications. try again later"
          );
        }
      } catch (e) {
        reject(e.message);
      }
    });
  }
}
