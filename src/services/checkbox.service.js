import createHttpError from "http-errors";
import Checkbox from "../models/Checkbox.model.js";
import { OptionService } from "./index.js";

const CheckboxService = {
  createWithQuestionData: async function () {
    const option = await OptionService.createDefault();
    try {
      const checkbox = await Checkbox.create({
        question_data: [option._id],
        answer_data: [],
      });
      return checkbox;
    } catch (err) {
      throw createHttpError(400, "Create checkbox failed");
    }
  },
};

export default CheckboxService;
