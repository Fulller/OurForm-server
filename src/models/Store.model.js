import mongoose, { Schema } from "mongoose";

const StoreModel = new mongoose.Schema({
  owner: {
    type: Schema.Types.String,
    ref: "User",
    required: true,
  },
  recently: [
    {
      type: Schema.Types.ObjectId,
      ref: "Form",
      default: [],
    },
  ],
  favourite: [
    {
      type: Schema.Types.ObjectId,
      ref: "Form",
      default: [],
    },
  ],
});

export default mongoose.model("Store", StoreModel);
