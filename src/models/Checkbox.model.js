import mongoose, { Schema } from "mongoose";

const CheckboxSchema = new Schema({
  question_data: [
    {
      type: Schema.Types.ObjectId,
      ref: "Option",
      required: true,
    },
  ],
  answer_data: [
    {
      type: Schema.Types.ObjectId,
      ref: "Option",
      required: true,
    },
  ],
  response_data: [
    {
      type: Schema.Types.ObjectId,
      ref: "Option",
      required: true,
    },
  ],
});

export default mongoose.model("Checkbox", CheckboxSchema);
