//*********************************************/
// Project : Project management Using GraphQl 
// Organization : CyberNest
// Author : Osama Atiq
// Date : 2023-02-28
// Assigned By : Sir Zaheer
//*********************************************/

//Schema Defination For  Assigned Projects.
const mongoose = require("mongoose");
const Project_Assign_Model = mongoose.model("Project_Assign", {
  Project_id: String,
  Team_Member_Name: String,
  Role: String,
  Status: String,
});

module.exports = Project_Assign_Model;
