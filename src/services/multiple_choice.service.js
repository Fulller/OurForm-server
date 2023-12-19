import createHttpError from "http-errors";
import MultipleChoice from "../models/MultipleChoice.model.js";
import { OptionService } from "./index.js";

const MultipleChoiceService = {
  createWithQuestionData: async function () {
    const option = await OptionService.createDefault();
    try {
      const multipleChoice = await MultipleChoice.create({
        question_data: [option._id],
        answer_data: null,
      });
      return multipleChoice;
    } catch (err) {
      throw createHttpError(400, "Create multiple choice failed");
    }
  },
};

export default MultipleChoiceService;
