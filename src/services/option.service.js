import Option from "../models/Option.model.js";
import createHttpError from "http-errors";

const OptionService = {
  createDefault: async function () {
    try {
      const option = await Option.create({ text: "", image: "" });
      return option;
    } catch (err) {
      throw createHttpError(400, "Create option failed");
    }
  },
};
export default OptionService;
