import createHttpError from "http-errors";
import Question from "../models/Question.model.js";
import { DataService } from "./index.js";
import { questionTypeHasQuestionData } from "../const/questionType.const.js";

import _ from "lodash";

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
      await question.save().catch((err) => {
        throw createHttpError(400, "Update question failed");
      });
    } catch (err) {
      throw createHttpError(400, "Update question failed");
    }
  },
  delete: async function ({ _id }) {
    try {
      await Question.deleteOne({ _id });
    } catch (err) {
      throw createHttpError(400, "Delete question failed");
    }
  },
  findByIdAndPopulate: async function (_id) {
    try {
      return await Question.findById(_id)
        .populate({
          path: "data",
          populate: _.map(questionTypeHasQuestionData, (questionType) => {
            return {
              path: questionType.type,
              populate: { path: "question_data" },
            };
          }),
        })
        .exec();
    } catch (err) {
      throw createHttpError(400, "Question :: Find by id and populate failed");
    }
  },
};
export default QuestionService;
