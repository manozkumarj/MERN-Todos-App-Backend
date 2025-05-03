import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minLength: 2,
      maxLength: 64,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      minLength: 2,
      maxLength: 64,
      lowecase: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email'],
      index: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
      maxLength: 255,
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    accountStatus: {
        type: String,
        enum: ['pending', 'active', 'inActive', 'deleted'],
        default: 'pending'
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  this.isEmailVerified = false;
  this.accountStatus = "pending";
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
