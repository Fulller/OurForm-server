import mongoose, { Schema } from "mongoose";

const SettingSchema = new Schema({
  title: {
    type: Schema.Types.String,
  },
  describe: {
    type: Schema.Types.String,
  },
  image: {
    type: Schema.Types.String,
  },
  has_index: {
    type: Schema.Types.Boolean,
    default: false,
  },
});

export default mongoose.model("Setting", SettingSchema);
