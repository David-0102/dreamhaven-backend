import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("🔥 MongoDB Atlas Connected Successfully");
});

// Define a simple schema
const testSchema = new mongoose.Schema({
  name: String,
});

const Test = mongoose.model("Test", testSchema);

// CRUD Test
const runTest = async () => {
  try {
    // CREATE
    const doc = await Test.create({ name: "WSL Test" });
    console.log("Created:", doc);

    // READ
    const found = await Test.find({});
    console.log("Found:", found);

    // UPDATE
    const updated = await Test.findOneAndUpdate(
      { name: "WSL Test" },
      { name: "WSL Updated" },
      { new: true }
    );
    console.log("Updated:", updated);

    // DELETE
    const deleted = await Test.deleteOne({ name: "WSL Updated" });
    console.log("Deleted:", deleted);

    process.exit(0); // exit after test
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runTest();
