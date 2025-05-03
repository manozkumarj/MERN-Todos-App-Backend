import mongoose from "mongoose";
import { MONGO_DB_URI } from "../utils/constants.js";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI);
    console.log("Successfully connected to DB");

    // mongoose.connection.on("connected", () => {
    //   console.log("Connected to database sucessfully");
    // });

    mongoose.connection.on("error", (err) => {
      console.log("Error while connecting to database :" + err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongodb connection disconnected");
    });
  } catch (error) {
    console.error("Could not connect to DB", error);
    process.exit(1);
  }
};
export default connectToDatabase;
