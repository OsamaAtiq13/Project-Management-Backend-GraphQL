//*********************************************/
// Project : Project management Using GraphQl
// Organization : CyberNest
// Author : Osama Atiq
// Date : 2023-02-28
// Assigned By : Sir Zaheer
//*********************************************/

//Schema Definition Projects

const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  Title: String,
  Week: Number,
  Status: String,
  Comment: String,
  Technologies: String,
  Lead: String,
  Owner: String,
  Manager: String,
});

ProjectSchema.set("timestamps", true);

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;