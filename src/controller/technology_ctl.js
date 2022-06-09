//jshint esversion:11
import TechService from "../services/course/technology.js";
import { response } from "../utils/response.js";

export const techController = {
  createTechnology: async (req, res, next) => {
    let finalResp;
    if(req.user.role === "FT-HR"){
    await new TechService()
      .createTechnology(req.query.title)
      .then((result) => (finalResp = response(200, "success", result)))
      .catch(
        (err) => (finalResp = response(500, "Validation error", {}, true, err))
      );
    }else {
      console.log("data");
      finalResp = response(401, "Validation error", {}, true, {
        message: "Given user is not authorized to create technology",
      });
    }
    res.json(finalResp);
  },

  editTechnology: async (req, res, next) => {
    let finalResp,
      { id, title } = req.query;
      if(req.user.role === "FT-HR"){
    await new TechService()
      .editTechnology(id, title)
      .then((result) => (finalResp = response(200, "success", result)))
      .catch(
        (err) => (finalResp = response(500, "Validation error", {}, true, err))
      );
    }else {
      console.log("data");
      finalResp = response(401, "Validation error", {}, true, {
        message: "Given user is not authorized to edit technology",
      });
    }
    res.json(finalResp);
  },

  deleteTechnology: async (req, res, next) => {
    let finalResp;
    if(req.user.role === "FT-HR"){
    await new TechService()
      .deleteTechnology(req.query.id)
      .then((result) => (finalResp = response(200, "success", result)))
      .catch(
        (err) => (finalResp = response(500, "Validation error", {}, true, err))
      );
    }else {
      console.log("data");
      finalResp = response(401, "Validation error", {}, true, {
        message: "Given user is not authorized to delete technology",
      });
    }
    res.json(finalResp);
  },

  listTechnology: async (req, res, next) => {
    let finalResp;
    if(req.user.role === "FT-HR"){
    await new TechService()
      .getTechnology()
      .then((result) => (finalResp = response(200, "success", result)))
      .catch(
        (err) => (finalResp = response(500, "Validation error", {}, true, err))
      );
    }else {
      console.log("data");
      finalResp = response(401, "Validation error", {}, true, {
        message: "Given user is not authorized to get technology",
      });
    }
    res.send(finalResp);
  },
};
