import mongoose, { Schema } from "mongoose";

const MultipleChoiceSchema = new Schema({
  question_data: [
    {
      type: Schema.Types.ObjectId,
      ref: "Option",
    },
  ],
  answer_data: {
    type: Schema.Types.ObjectId,
    ref: "Option",
  },
  response_data: {
    type: Schema.Types.ObjectId,
    ref: "Option",
  },
});

export default mongoose.model("MultipleChoice", MultipleChoiceSchema);
