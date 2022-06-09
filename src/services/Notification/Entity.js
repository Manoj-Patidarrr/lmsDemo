//jshint esversion:11

import entity from "../../models/entity.js";
import entityType from "../../models/entityType.js";

export default class EntityServices {
  /** Entity details - CRUD */

  createEntity(title) {
    return new Promise(async (resolve, reject) => {
      try {
        let newEntity = await new entity({ title }).save();
        if (
          newEntity && typeof newEntity === "object" && Object.keys(newEntity) !== 0
        ) {
          resolve(newEntity);
        }
        reject("Something wrong while creating entity data. try again");
      } catch (e) {
        reject(e.message);
      }
    });
  }

  listEntity() {
    return new Promise(async (resolve, reject) => {
      try {
        let entityList = await entity.find().select({ title: 1 }).exec();
        if (entityList && entityList.length) {
          resolve(entityList);
        }
        reject("No entity found");
      } catch (e) {
        reject(e.message);
      }
    });
  }

  deleteEntity(entity_id) {
    return new Promise(async (resolve, reject) => {
      try {
        let deletedResult = await entity
          .findOneAndDelete({ entityID: entity_id })
          .exec();
        if (deletedResult && Object.keys(deletedResult).length) {
          resolve(deletedResult);
        }
        reject("No entity found");
      } catch (e) {
        reject(e.message);
      }
    });
  }

  updateEntity(entity_id, title) {
    return new Promise(async (resolve, reject) => {
      try {
        let filter = { _id: entity_id },
          update = { title };
        let updatedResult = await entity.findOneAndUpdate(filter, update, {
          new: true,
        });

        if (updatedResult && Object.keys(updatedResult).length) {
          resolve(updatedResult);
        }
        reject("No entity found");
      } catch (e) {
        reject(e.message);
      }
    });
  }

  /** Entity Type details */

  createEntityType(title, description) {
    return new Promise(async (resolve, reject) => {
      try {
        let newEntityType = await new entityType({ title, description }).save();
        if (
          newEntityType &&
          typeof newEntityType === "object" &&
          Object.keys(newEntityType).length
        ) {
          resolve(newEntityType);
        }
        reject(newEntityType);
      } catch (e) {
        reject(e.message);
      }
    });
  }

  listEntityType() {
    return new Promise(async (resolve, reject) => {
      try {
        let entityTypeList = await entityType.find().exec();
        if (
          entityTypeList &&
          typeof entityTypeList === "object" &&
          entityTypeList.length
        ) {
          resolve(entityTypeList);
        }
        reject("No enity type data found");
      } catch (e) {
        reject(e.message);
      }
    });
  }

  deleteEntityType(entity_type_id) {
    return new Promise(async (resolve, reject) => {
      try {
        let filter = { _id: entity_type_id };
        let deletedResult = await entityType.findOneAndDelete(filter);
        if (
          deletedResult &&
          typeof deletedResult === "object" &&
          Object.keys(deletedResult).length
        ) {
          resolve(deletedResult);
        }
        reject("No entity data found");
      } catch (e) {
        reject(e.message);
      }
    });
  }

  updateEntityType(entity_type_id, title, description) {
    return new Promise(async (resolve, reject) => {
      try {
        let filter = { _id: entity_type_id },
          update = { title, description, updatedOn: Date.now() };
        let updatedData = await entityType.findOneAndUpdate(filter, update, {
          new: true,
        });
        console.log(updatedData);
        if (
          updatedData &&
          typeof updatedData === "object" &&
          Object.keys(updatedData).length
        ) {
          resolve(updatedData);
        }
        reject("no entity id found");
      } catch (err) {
        reject(err.message);
      }
    });
  }
}
