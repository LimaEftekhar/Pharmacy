const mongoose = require("mongoose");

//recently added line below. Prevent queries from buffering if DB is not ready
mongoose.set("bufferCommands", false);

// const connectDB = (url) => {
//   return mongoose.connect(url)
// }

//Start: Recently added
const connectDB = async (url) => {
  try {
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
//End: recently added

module.exports = connectDB;
