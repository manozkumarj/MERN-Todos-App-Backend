import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
    userAgent: {
      type: String,
      required: [true, "Agent is required"],
      trim: true,
      minLength: 1,
      maxLength: 24,
    },
    refreshToken: {
      type: String,
      required: [true, "Token is required"],
      trim: true,
      minLength: 1,
      maxLength: [255, "Token length should not be more than 255 characters."],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

sessionSchema.pre("save", function (next) {
  next();
});

const Session = mongoose.model("Session", sessionSchema);

export default Session;
