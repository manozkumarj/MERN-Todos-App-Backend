import jwt from "jsonwebtoken";
import Session from "../models/session.model.js";
import { JWT_REFRESH_SECRET, JWT_SESSION_SECRET } from "./constants.js";
import mongoose from "mongoose";

const generateTokens = async (user) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const payload = { _id: user._id, fullName: user.fullName };
    const accessToken = jwt.sign(payload, JWT_SESSION_SECRET, {
      expiresIn: "4m",
    });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: "14m",
    });

    console.log("refreshToken --> ", refreshToken);

    // Deleting existing refresh token of the user
    // TODO --> need to add condition of userAgent in future
    await Session.findOneAndDelete({ userId: user._id });

    const newUser = await Session.create(
      [
        {
          userId: user._id,
          userAgent: "browser",
          refreshToken: refreshToken,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return Promise.reject(err);
  }
};

export default generateTokens;
