import createHttpError from "http-errors";
import ShortAnswer from "../models/ShortAnswer.model.js";

const ShortAnswerService = {
  createWithQuestionData: async function () {
    try {
      const shortAnswer = await ShortAnswer.create({
        answer_data: [],
      });
      return shortAnswer;
    } catch (err) {
      throw createHttpError(400, "Create short answer failed");
    }
  },
};

export default ShortAnswerService;
