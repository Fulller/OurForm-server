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
});

export default mongoose.model("Setting", SettingSchema);
