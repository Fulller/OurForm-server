import mongoose, { Schema } from "mongoose";

const QuestionSchema = new Schema({
  type: {
    type: Schema.Types.String,
    enum: [
      "short_answer",
      "paragraph",
      "multiple_choice",
      "checkbox",
      "dropdown_menu",
    ],
    required: true,
  },
  title: {
    type: Schema.Types.String,
  },
  image: {
    type: Schema.Types.String,
  },
  required: {
    type: Schema.Types.Boolean,
  },
  score: {
    type: Schema.Types.Number,
  },
  data: {
    type: Schema.Types.ObjectId,
    res: "Data",
    require: true,
  },
});

export default mongoose.model("Question", QuestionSchema);
