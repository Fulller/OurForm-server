import mongoose, { Schema } from "mongoose";

const ParagraphSchema = new Schema({
  response_data: {
    type: Schema.Types.String,
  },
});

export default mongoose.model("Paragraph", ParagraphSchema);
