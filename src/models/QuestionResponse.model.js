import mongoose, { Schema } from "mongoose";

const QuestionResponseSchema = new Schema({
  Question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    require: true,
  },
  data: {
    type: Schema.Types.String,
    ref: "Data",
    require: true,
  },
  correct: {
    type: Schema.Types.Boolean,
    default: false,
  },
});

export default mongoose.model("QuestionResponse", QuestionResponseSchema);
