import mongoose, { Schema } from "mongoose";

const OptionSchema = new Schema({
  text: {
    type: Schema.Types.String,
    default: "",
  },
  image: {
    type: Schema.Types.String,
    default: "",
  },
});

export default mongoose.model("Option", OptionSchema);
