import mongoose from "mongoose";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SESSION_SECRET, SALT } from "../utils/constants.js";

const registrationController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { fullName, email, password } = req.body;
    const checkEmail = await User.findOne({ email }).exec();
    console.log("checkEmail --> ", checkEmail);
    console.log("req.body ==> ", req.body);
    if (checkEmail) {
        res.status(409).json({
        success: false,
        message: "Email already exist",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    console.log('hashPassword --> ', hashPassword);

    const newUser = await User.create(
        [{
          fullName,
          email,
          password: hashPassword,
        }],
      { session }
    );

    const token = jwt.sign({ userId: newUser[0]?._id }, JWT_SESSION_SECRET, {
      expiresIn: 15 * 60 * 60,
    });
    console.log("token --> ", token);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUser[0],
      },
    });
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({
      success: false,
      error: err,
    });
  }
};

export default registrationController;
