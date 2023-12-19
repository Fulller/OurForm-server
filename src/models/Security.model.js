import mongoose, { Schema } from "mongoose";

const SecuritySchema = new Schema({
  lock: {
    type: Schema.Types.Boolean,
    required: true,
    default: false,
  },
  activated: {
    type: Schema.Types.Boolean,
    required: true,
    default: false,
  },
  password: {
    type: Schema.Types.String,
  },
  time: {
    type: Schema.Types.Number,
  },
  duration: {
    type: Schema.Types.Number,
  },
  end_time: {
    type: Schema.Types.Date,
  },
});

export default mongoose.model("Security", SecuritySchema);
