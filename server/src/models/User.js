import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Sanaz install bcrypt for password hashing
import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
      },
      message:
        "Password must be at least 8 characters and contain both numbers and letters",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "is invalid"], // Regex to validate email format
  },
  city: { type: String, required: true },
  userImageURL: { type: String, default: "" },
});

// Hashing passwords pre-save
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = [
    "username",
    "email",
    "password",
    "firstName",
    "lastName",
    "city",
    "userImageURL",
  ];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  //  in case Mongoose's built-in validation isn't automatically applied.

  ["username", "email", "password", "city"].forEach((key) => {
    if (userObject[key] == null) {
      errorList.push(`${key} is a required field`);
    }
  });

  return errorList;
};

const User = mongoose.model("users", userSchema);

export { validateUser };
export default User;
