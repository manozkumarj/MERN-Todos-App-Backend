import { Router } from "express";
import { validateRequestBody } from "../middlewares/validations.middleware.js";
import loginController from "../controllers/login.controller.js";
import { loginSchema } from "../controllers/users.schema.js";
import verifySessionToken from "../utils/verifySessionToken.js";
import { REFRESH_PATH } from "../utils/constants.js";
import Session from "../models/session.model.js";

const authRouter = Router();

authRouter.post("/login", validateRequestBody(loginSchema), loginController);

authRouter.post("/logout", verifySessionToken, async (req, res) => {
    console.log("req.cookies --> ", req.cookies);
  const { jwt } = req.cookies;
  if (!jwt) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized",
      message: "Token not found..",
    });
  }

  console.log("req.user --> ", req.user);

  const userId = req.user?._id;

  if (userId) {
    // remove refresh token from session collection
    await Session.findOneAndDelete({ userId });
  }

  // clear cookies
  return res
    .clearCookie("jwt", { httpOnly: true, sameSite: "None" })
    .status(200)
    .json({ success: true, message: "Logout successful" });
});

export default authRouter;
