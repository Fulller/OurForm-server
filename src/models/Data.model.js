import mongoose, { Schema } from "mongoose";

const DataSchema = new Schema({
  short_answer: {
    type: Schema.Types.ObjectId,
    ref: "ShortAnswer",
  },
  paragraph: {
    type: Schema.Types.ObjectId,
    ref: "Paragraph",
  },
  multiple_choice: {
    type: Schema.Types.ObjectId,
    ref: "MultipleChoice",
  },
  checkbox: {
    type: Schema.Types.ObjectId,
    ref: "Checkbox",
  },
  dropdown_menu: {
    type: Schema.Types.ObjectId,
    ref: "DropdownMenu",
  },
});

export default mongoose.model("Data", DataSchema);
