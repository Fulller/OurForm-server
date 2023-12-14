import mongoose, { Schema } from "mongoose";
import config from "../configs/index.js";

const expiresTimeRefreshToken = config.app.expiresTimeRefreshToken;

const TokenModel = new mongoose.Schema({
  user: {
    type: Schema.Types.String,
    ref: "User",
    required: true,
  },
  token: {
    type: Schema.Types.String,
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
    expires: expiresTimeRefreshToken,
  },
});

export default mongoose.model("Token", TokenModel);
