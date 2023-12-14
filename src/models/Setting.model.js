import mongoose, { Schema } from "mongoose";

const SettingSchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true,
  },
  describe: {
    type: Schema.Types.String,
  },
  image: {
    type: Schema.Types.String,
    required: true,
  },
});

export default mongoose.model("Setting", SettingSchema);
