//*********************************************/
// Project : Project management Using GraphQl
// Organization : CyberNest
// Author : Osama Atiq
// Date : 2023-02-28
// Assigned By : Sir Zaheer
//*********************************************/

// Schema For Project Assign By week

const mongoose = require("mongoose");

const Assign_Week = mongoose.Schema(
  {
    Project_id: {
      type: String,
      required: true,
    },

    User_id: {
      type: String,
      required: true,
    },
    Week: {
      type: String,
      required: true,
    },

    hours_Planned: {
      type: String,
      required: true,
    },

    hours_Spent: { type: String, required: true },
  },
  { timestamps: true }
);
const assign_Week = mongoose.model("Assign_Week", Assign_Week);

module.exports = assign_Week;
