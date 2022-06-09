import mongoose from "mongoose";
import task from "../models/task.js";
import taskmodel from "../models/task.js";
import { User } from "../models/userDetails.js";

export const task_controller = {
  create: async (req, res) => {
    try {
      if (req.user.role === "FT-HR") {
        const { month, week, day, taskName, reflink, candidateID, titleOfTask } = req.body;
        const match = await User.findById(candidateID)
        if (match) {
          if (!(week >= 5) && !(day >= 7)) {

            if (candidateID && week && day && taskName && reflink && titleOfTask && month) {

              const data = await new taskmodel({
                candidateID,
                titleOfTask,
                month,
                taskDetails: { week, day, taskName, reflink }
              })
              const result = await data.save()
              res.status(200).json({
                message: "task create successfully",
                data: result
              })

            } else {
              res.status(400).json({
                message: "check fields",
                data: {}
              })
            }
          } else {
            res.json({
              message: "invalid week or day",
              data: {}
            })
          }
        } else {
          res.json({
            message: "invalid candidate id",
            data: {}
          })
        }
      }
      else { res.status(400).json({ message: "you are not authorized to add task" }) }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "server not found",
        error: err
      })
    }
  },
  getTask: async (req, res) => {
    try {
      const data = await taskmodel.find()
      if (data === "") {
        res.status(200).json({
          message: "task is empty",
          data: {}
        })
      } else {
        res.status(200).json({
          message: "get task successfully",
          data: data
        })
      }

    } catch (err) {
      res.status(400).json({
        message: "server not found",
        error: err
      })
    }
  },
  getTaskById: async (req, res) => {
    try {
      const candidateID = req.query.candidateID;
      const month = req.query.month;
      // const match = await taskmodel.find({ candidateID: candidateID })
      const data = await taskmodel.aggregate([{ $match: {$and:[ {candidateID: mongoose.Types.ObjectId(candidateID)},{month:month}] }  }])
       if (!(data == "")) {
        res.status(200).json({
          message: "get task successfully",
          data: data
        })
      } else {
        res.status(400).json({
          message: "invalid candidateID",
          data: {}
        })
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "invalid id",
        error: err
      })
    }
  },
  update_task: async (req, res) => {
    try {
      if (req.user.role === "FT-HR") {
        const updatedata = await taskmodel.findOneAndUpdate({ _id: req.query.id }, {
          $set: {
            taskDetails: {
              week: req.body.week,
              day: req.body.day,
              taskName: req.body.taskName,
            },
            titleOfTask: req.body.titleOfTask
          }
        }, { new: true })

        if (updatedata) {
          res.status(200).json({
            message: "update success"
          })
        } else {
          res.status(400).json({
            message: "invalid id"
          })
        }
      } else {
        res.status(400).json({
          message: "you are not authorized to update task"
        })
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "server not found",
        error: err
      })
    }
  },
  delete: async (req, res) => {
    try {
      if (req.user.role === "FT-HR") {
        const delete_data = await taskmodel.findByIdAndDelete({ _id: req.query.id })
        if (delete_data) {
          res.status(200).json({
            message: "delete data successfully",
          })
        } else {
          res.status(400).json({
            message: "invalid id",
            data: {}
          })
        }
      } else {
        res.status(400).json({
          message: "you are not authorized to delete task",
          data: {}
        })
      }
    } catch (err) {
      res.status(400).json({
        message: "server not found",
        error: err
      })
    }
  }


}