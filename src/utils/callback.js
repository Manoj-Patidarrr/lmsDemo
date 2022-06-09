//jshint esversion:11
import { response } from "./response.js";

export function callback(res, apiResponse = () => {}, method, args) {
  return (req, res, next) => {
    let finalResp;
    try {
      finalResp = response(200, "success", apiResponse(result));
    } catch (error) {
      finalResp = response(500, "Internal error", {}, true, error);
    }
    res.json(finalResp);
  };
}
