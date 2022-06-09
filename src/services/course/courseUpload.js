//jshint esversion:11

import XLSX from "xlsx";
import courseWeekMap from "../../models/courseWeek.js";
import course from "../../models/course.js";
import _ from "lodash";

function excelToJSON(file) {
  const workbook = XLSX.readFile(file);
  let worksheets = {};
  for (const sheetName of workbook.SheetNames) {
    worksheets[sheetName] = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );
  }
  // console.log("check", worksheets);
  return worksheets;
}

function validateCourseIDs(sheet) {
  return new Promise((resolve, reject) => {
    try {
      for (const data of sheet) {
        console.log(data);
        data.ModuleID.split(",").forEach(async (id) => {
          id = id.trim();
          console.log(id);
          if (_.size(await course.findById(id)) === 0) {
            reject(`Invalid course ID = ${id} in sheet name = ${sheet}`);
          }
        });
      }
      resolve(true);
    } catch (e) {
      reject(e.message);
    }
  });
}

export function uploadCourses(file) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("manish", file)
      let worksheets = excelToJSON(file);
      for (const sheet in worksheets) {
        console.log(sheet);

        if (await validateCourseIDs(worksheets[sheet])) {
          const COURSE_WEEK_MAP = new courseWeekMap({
            courseWeekMap: worksheets[sheet],
          });
          console.log("checkdata",COURSE_WEEK_MAP);
          await COURSE_WEEK_MAP.save();
        }
      }
      resolve("success");
    } catch (e) {
      reject(e.message);
    }
  });
}
