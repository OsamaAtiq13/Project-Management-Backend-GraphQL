//*********************************************/
// Project : Project management Using GraphQl 
// Organization : CyberNest
// Author : Osama Atiq
// Date : 2023-02-28
// Assigned By : Sir Zaheer
//*********************************************/

//Schema Definition Projects

const mongoose = require("mongoose");
const ProjectModel = mongoose.model("Project", {
  Title: String,
  Week: Number,
  Status: String,
  Comment: String,
  Technologies: String,
  Create_Update_Ts: String,
  Create_Update: String,
  Lead: String,
  Owner: String,
  Manager: String,
});

module.exports = ProjectModel;
