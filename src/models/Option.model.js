import mongoose, { Schema } from "mongoose";

const OptionSchema = new Schema({
  text: {
    type: Schema.Types.String,
  },
  image: {
    type: Schema.Types.String,
  },
});

export default mongoose.model("Option", OptionSchema);
