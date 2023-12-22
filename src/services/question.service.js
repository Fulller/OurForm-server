import createHttpError from "http-errors";
import Question from "../models/Question.model.js";
import { DataService } from "./index.js";

const QuestionService = {
  createDefault: async function ({ type }) {
    const data = await DataService.createWithQuestionData({ type });
    try {
      const question = await Question.create({ type, data: data._id });
      return question;
    } catch (err) {
      throw createHttpError(400, "Create question failed");
    }
  },
  update: async function ({ _id, key, value }) {
    try {
      const question = await Question.findById(_id);
      question[key] = value;
      await question.save();
    } catch (err) {
      throw createHttpError(400, "Update question failed");
    }
  },
};
export default QuestionService;
