import mongoose, { Schema } from "mongoose";

const FormSchema = new Schema({
  owner: {
    type: Schema.Types.String,
    ref: "User",
    required: true,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  ],
  setting: {
    type: Schema.Types.ObjectId,
    ref: "Setting",
    required: true,
  },
  security: {
    type: Schema.Types.ObjectId,
    ref: "Security",
    required: true,
  },
});

export default mongoose.model("Form", FormSchema);
