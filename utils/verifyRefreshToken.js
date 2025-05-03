import Session from "../models/session.model.js";
import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET } from "./constants.js";

const verifyRefreshToken = (refreshToken) => {
  const privateKey = JWT_REFRESH_SECRET;

  return new Promise(async (resolve, reject) => {
    const checkRefreshToken = await Session.findOne({ refreshToken }).exec();
    if (!checkRefreshToken) {
      console.log("doc --> ", doc);
      return reject({
        success: false,
        error: true,
        message: "Invalid refresh token",
      });
    }

    jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
      if (err)
        return reject({
          success: false,
          error: true,
          message: "Invalid refresh token",
        });
      resolve({
        tokenDetails,
        error: false,
        message: "Valid refresh token",
      });
    });
  });
};

export default verifyRefreshToken;
