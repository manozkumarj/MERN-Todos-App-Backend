import jwt from "jsonwebtoken";
import { JWT_SESSION_SECRET } from "./constants.js";

const verifySessionToken = async (req, res, next) => {
  const authHeader = req.header("x-access-token");
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized",
      message: "Token not found..!",
    });
  }
  const token = authHeader.split(" ")[1];
  if (!token)
    return res
      .status(403)
      .json({ success: false, error: true, message: "Access Denied: No token provided" });

  try {
    const tokenDetails = jwt.verify(token, JWT_SESSION_SECRET);
    console.log("tokenDetails --> ", tokenDetails);
    req.user = tokenDetails;
    next();
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ success: false, error: true, message: "Access Denied: Invalid token" });
  }
};

export default verifySessionToken;
