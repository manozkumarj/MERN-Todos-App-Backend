import { Router } from "express";
import jwt from "jsonwebtoken";
import verifyRefreshToken from "../utils/verifyRefreshToken.js";
import { JWT_SESSION_SECRET } from "../utils/constants.js";

const refreshTokenRouter = Router();

// get new access token
refreshTokenRouter.post("/", async (req, res) => {
  console.log("req.cookies --> ", req.cookies);
  const { jwt: jwtCookie } = req.cookies;
  if (!jwtCookie) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized",
      message: "Token not found...!",
    });
  }

  verifyRefreshToken(jwtCookie)
    .then(({ tokenDetails }) => {
      console.log("tokenDetails --> ", tokenDetails);
      const payload = { _id: tokenDetails._id };
      const accessToken = jwt.sign(payload, JWT_SESSION_SECRET, {
        expiresIn: "4m",
      });

      res.status(200).json({
        success: true,
        error: false,
        accessToken,
        message: "Access token created successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        error: true,
        message: err,
      });
    });
});

export default refreshTokenRouter;
