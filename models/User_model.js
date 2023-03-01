
//*********************************************/
// Project : Project management Using GraphQl 
// Organization : CyberNest
// Author : Osama Atiq
// Date : 2023-02-28
// Assigned By : Sir Zaheer
//*********************************************/

//Schema Definition For User .
 
const mongoose = require("mongoose");

const user = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },

  Password: {
    type: String,
    required: true,
  },

  Role: {
    type: String,
    required: true,
  },

  Time: {
    type: Number,
  },

  date: {
    type: String,
  },
  checkout: {
    type: Boolean,
    default: false,
  },
});
const User = mongoose.model("User", user);

module.exports = User;
