const mongoose = require("mongoose");

const uri =
  "mongodb+srv://osama:123@mernprojectcluster.hwffsui.mongodb.net/?retryWrites=true&w=majority";
  module.exports=async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
}