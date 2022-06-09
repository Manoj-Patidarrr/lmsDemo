// jshint esversion:6

import mongoose from "mongoose";

const taskSchema = mongoose.Schema({

    candidateID: {
        type: mongoose.Types.ObjectId, ref: 'Users',
        required: true,
    },

    titleOfTask: {
        type: String,
        required: true
    },


    month: {
        type: String,
        enum: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        required: true,
    },


    taskDetails: {
        type: Object,
        required: true
    },


    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});

export default mongoose.model("task", taskSchema);
