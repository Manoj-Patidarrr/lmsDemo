//jshint esversion :11
import mongoose from "mongoose";
import { Candidate } from "../services/user/candidate.js";
import { candidResp } from "./api/model/Response/candidateResp.js";
import { candidateReq } from "./api/model/Request/candidate.js";
import { courseResp } from "./api/model/Response/course.js";
import { response } from "../utils/response.js";

export const candid_ctrl = {
  addCandidate: async (req, res, next) => {
    let finalResp;
    if(req.user.role === "FT-HR"){
    await new Candidate()
      .addCandidate(candidateReq(req.body))
      .then(
        (result) =>
          (finalResp = response(
            200,
            "candidate added successfully",
            candidResp(result)
          ))
      )
      .catch(
        (err) => (finalResp = response(500, "validation error", {}, true, err))
      );
    }else {
      console.log("data");
      finalResp = response(401, "Validation error", {}, true, {
        message: "Given user is not authorized to ADD candidate",
      });
    }
    res.json(finalResp);
  },

  editCandidate: async (req, res, next) => {
    let finalResp;
    if(req.user.role === "FT-HR"){
    await new Candidate()
      .editCandidate(candidateReq(req.body), req.body.id)
      .then(
        (result) =>
          (finalResp = response(
            200,
            "candidate data edited successfully",
            candidResp(result)
          ))
      )
      .catch((err) => response(500, "validation error", {}, true, err));
    }else {
      console.log("data");
      finalResp = response(401, "Validation error", {}, true, {
        message: "Given user is not authorized to edit candidate"
      });
    }
    res.json(finalResp);
  },

  listCandidate: async (req, res, next) => {
    let finalResp;
    if(req.user.role === "FT-HR"){
    console.log("candidID:",req.query.id);
    let id = mongoose.Types.ObjectId(req.query.id)
    await new Candidate()
      .listCandidate(id)
      .then(
        (result) =>
          (finalResp = response(
            200,
            "candidate list - success",
            candidResp(result)
          ))
      )
      .catch((err) => response(500, "validation error", {}, true, err));
    }else {
      console.log("data");
      finalResp = response(401, "Validation error", {}, true, {
        message: "Given user is not authorized to get candidate",
      });
    }
    res.json(finalResp);
  },
  listCandidates: async (req, res, next) => {
    let finalResp,
    { designation } = req.query;
      if(req.user.role === "FT-HR"){
    await new Candidate()
      .listCandidates(designation)
      .then(
        (result) =>
          (finalResp = response(
            200,
            "All candidate data - success",
            result.map((d) => candidResp(d))
          ))
      )
      .catch(
        (err) => (finalResp = response(500, "validation error", {}, true, err))
      );
    }else {
      console.log("data");
      finalResp = response(401, "Validation error", {}, true, {
        message: "Given user is not authorized to get candidates",
      });
    }
       res.json(finalResp);
  },
  deleteCandidate: async (req, res, next) => {
    let finalResp;
    if(req.user.role === "FT-HR"){
    await new Candidate()
      .deleteCandidate(req.query.id)
      .then(
        (result) =>
          (finalResp = response(200, "candidate deleted successfully", result))
      )
      .catch((err) => response(500, "validation error", {}, true, err));
  }
      else {
        console.log("data");
        finalResp = response(401, "Validation error", {}, true, {
          message: "Given user is not authorized to delete candidate",
        });
      }
    res.json(finalResp);
  },

  updateFavorites: async (req, res, next) => {
    let finalResp,
      { courseID, event } = req.body,
      userID = req.user.userID;
    await new Candidate()
      .updateFavouriteList(courseID, userID, event)
      .then((result) =>
        (finalResp = response(200, "favourites - success", result)).catch(
          (err) =>
            (finalResp = response(500, "Validation error", {}, true, err))
        )
      );

    res.json(finalResp);
  },

  getUserFavCourses: async (req, res, next) => {
    let finalResp;
    let userID = req.user.userID;
    await new Candidate()
      .getUserfavCourses(userID)
      .then(
        (result) =>
          (finalResp = response(200, "get favourite course -success", result))
      )
      .catch(
        (err) => (finalResp = response(500, "Validation error", true, err))
      );

    res.json(finalResp);
  },
};
