import User from "../models/user.model.js";
import generateTokens from "../utils/generateTokens.js";
import bcrypt from "bcryptjs";

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await User.findOne({ email })
      .select("_id fullName email password isEmailVerified accountStatus")
      .exec();
    console.log("req.body ==> ", req.body);
    if (!userDetails) {
      res.status(409).json({
        success: false,
        message: "User doesn't exist",
      });
    }
    console.log("userDetails --> ", userDetails);

    // evaluate password
    const match = await bcrypt.compare(password, userDetails.password);
    console.log("match --> ", match);

    if (!match) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const { accessToken, refreshToken } = await generateTokens(userDetails);
    console.log("accessToken --> ", accessToken);
    console.log("refreshToken --> ", refreshToken);

    if (!accessToken || !refreshToken) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }

    // set cookies
    return res
      .cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000
      })

      // For production
      // res.cookie('username', 'chetan_patil', { maxAge: 900000, domain: '.medium.com', secure: true });

      .status(200)
      .json({
        success: true,
        message: "User details",
        data: {
          token: accessToken,
          userDetails: {
            _id: userDetails?._id,
            fullName: userDetails?.fullName,
            email: userDetails?._id,
          },
        },
      });
  } catch (err) {
    res.json({
      success: false,
      error: true,
      message: err
    });
  }
};

export default loginController;
