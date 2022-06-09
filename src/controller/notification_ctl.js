//jshint esversion:11
import Entity from "../services/Notification/Entity.js";
import Notification from "../services/Notification/Notification.js";
import { notifyResp } from "./api/model/Response/notifyResp.js";

export const notification_ctrl = {
  /**TODO:Notification */
  createNotification: async (req, res, next) => {
    let finalResponse;

    await new Notification()
      .createNotification({ ...req.body })
      .then(async (result) => (finalResponse = await notifyResp(result)))
      .catch((err) => (finalResponse = err));

    res.json(finalResponse);
  },

  listNotification: async (req, res, next) => {
    let finalResponse = [];

    await new Notification(req.query.notifier_id)
      .listNotification()
      .then((result) => (finalResponse = result))
      .catch((err) => (finalResponse = err));
    res.json(finalResponse);
  },

  deleteNotification: async (req, res, next) => {
    let finalResponse;

    await new Notification()
      .deleteNotification(req.user.userID)
      .then((result) => (finalResponse = result))
      .catch((err) => (finalResponse = err));

    res.json(finalResponse);
  },

  /**TODO: entity */
  createEntity: async (req, res, next) => {
    let finalResponse;
    console.log("Inside create entity");
    await new Entity()
      .createEntity(req.body.title)
      .then((result) => (finalResponse = result))
      .catch((err) => (finalResponse = err));

    res.json(finalResponse);
  },

  editEntity: async (req, res, next) => {
    let finalResponse,
      { id, title } = req.body;

    await new Entity()
      .updateEntity(id, title)
      .then((result) => (finalResponse = result))
      .catch((err) => (finalResponse = err));

    res.json(finalResponse);
  },

  listEntity: async (req, res, next) => {
    let finalResponse;

    await new Entity()
      .listEntity()
      .then((result) => (finalResponse = result))
      .catch((err) => (finalResponse = err));

    res.json(finalResponse);
  },

  deleteEntity: async (req, res, next) => {
    let finalResponse;

    await new Entity()
      .deleteEntity(req.query.id)
      .then((result) => (finalResponse = result))
      .catch((err) => (finalResponse = err));

    res.json(finalResponse);
  },

  /**TODO: entity type */
  createEntityType: async (req, res, next) => {
    let finalResponse,
      { title, description } = req.body;

    await new Entity()
      .createEntityType(title, description)
      .then((result) => (finalResponse = result))
      .catch((err) => (finalResponse = err));

    res.json(finalResponse);
  },

  editEntityType: async (req, res, next) => {
    let finalResponse,
      { id, title, description } = req.body;

    console.log("Inside entity type");
    await new Entity()
      .updateEntityType(id, title, description)
      .then((result) => (finalResponse = result))
      .catch((err) => (finalResponse = err));

    res.json(finalResponse);
  },

  listEntityType: async (req, res, next) => {
    let finalResponse;

    await new Entity()
      .listEntityType()
      .then((result) => (finalResponse = result))
      .catch((err) => (finalResponse = err));

    res.json(finalResponse);
  },

  deleteEntityType: async (req, res, next) => {
    let finalResponse;

    await new Entity()
      .deleteEntityType(req.query.id)
      .then((result) => (finalResponse = result))
      .catch((err) => (finalResponse = err));

    res.json(finalResponse);
  },
};
