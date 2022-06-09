//jshint esversion:11
import Entity from "../../../../models/entity.js";
import EntityType from "../../../../models/entityType.js";
import { User } from "../../../../models/userDetails.js";

export const notifyResp = async (result) => {
  //   console.log(result);
  const { title, description } = await EntityType.findOne({
    _id: result.entityTypeID,
  })
    .select({ title: 1, description: 1, _id: 0 })
    .exec();

  const entity = await Entity.findOne({ _id: result.entityID })
    .select({ title: 1, _id: 0 })
    .exec();

  const actor =
    result.actor && (await User.exists({ _id: result.actor }))
      ? await User.findById(result.actor).select({ userName: 1, _id: 0 })
      : null;

  const notifier =
    result.notifier && (await User.exists({ _id: result.notifier }))
      ? await User.findById(result.notifier).select({ userName: 1, _id: 0 })
      : null;

  return Object.freeze({
    entity: entity.title,
    type: title,
    description: description,
    createdOn: result.createdOn,
    notifier: notifier.userName ?? "",
    createdBy: actor ? actor.userName : "",
  });
};
