import mongoose, { Schema } from "mongoose";

const FormResponseSchema = new Schema({
  form: {
    type: Schema.Types.ObjectId,
    ref: "Form",
    require: true,
  },
  responder: {
    type: Schema.Types.String,
    ref: "User",
    require: true,
  },
  question_responses: [
    {
      type: Schema.Types.ObjectId,
      ref: "QuestionResponse",
    },
  ],
  total_score: {
    type: Schema.Types.Number,
  },
  response_at: {
    type: Schema.Types.Date,
  },
});

export default mongoose.model("FormResponse", FormResponseSchema);
