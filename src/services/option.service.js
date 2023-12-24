import Option from "../models/Option.model.js";
import createHttpError from "http-errors";
import _ from "lodash";

const OptionService = {
  createDefault: async function () {
    try {
      const option = await Option.create({ text: "", image: "" });
      return option;
    } catch (err) {
      throw createHttpError(400, "Create option failed");
    }
  },
  deleteById: async function (_id) {
    try {
      await Option.deleteOne({ _id });
    } catch (err) {
      throw createHttpError(400, "Delete option failed");
    }
  },
  update: async function ({ _id, text = null, image = null }) {
    try {
      const option = await Option.findById(_id);
      const updatedFields = _.omitBy({ text, image }, _.isNull);
      _.assign(option, updatedFields);
      await option.save();
    } catch (err) {
      throw createHttpError(400, "Update option failed");
    }
  },
};
export default OptionService;
