import mongoose, { Schema } from "mongoose";

const ShortAnswerSchema = new Schema({
  answer_data: [
    {
      type: Schema.Types.String,
    },
  ],
  response_data: {
    type: Schema.Types.String,
  },
});

export default mongoose.model("ShortAnswer", ShortAnswerSchema);
