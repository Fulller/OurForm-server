import createHttpError from "http-errors";
import MultipleChoice from "../models/MultipleChoice.model.js";
import { OptionService } from "./index.js";
import _ from "lodash";

const MultipleChoiceService = {
  createWithQuestionData: async function () {
    const [option1, option2] = await Promise.all([
      OptionService.createDefault(),
      OptionService.createDefault(),
    ]);
    try {
      const multipleChoice = await MultipleChoice.create({
        question_data: [option1._id, option2._id],
        answer_data: null,
      });
      return multipleChoice;
    } catch (err) {
      throw createHttpError(400, "Create multiple choice failed");
    }
  },
  addQuestionData: async function ({ _id }) {
    const option = await OptionService.createDefault();
    try {
      const multipleChoice = await MultipleChoice.findById(_id);
      multipleChoice.question_data.push(option._id);
      await multipleChoice.save();
      return option;
    } catch (err) {
      throw createHttpError(400, "Multiple choice :: add question data failed");
    }
  },
  deleteQuestionData: async function ({ _id, optionId }) {
    await OptionService.deleteById(optionId);
    try {
      const multipleChoice = await MultipleChoice.findById(_id);
      multipleChoice.question_data = _.filter(
        multipleChoice.question_data,
        (optionId_item) => {
          return optionId_item != optionId;
        }
      );
      await multipleChoice.save();
    } catch (err) {
      throw createHttpError(
        400,
        "Multiple choice :: delete question data failed"
      );
    }
  },
  ortherQuestionData: async function ({ _id, question_data }) {
    try {
      const multipleChoice = await MultipleChoice.findById(_id);
      multipleChoice.question_data = question_data;
      await multipleChoice.save();
    } catch (err) {
      throw createHttpError(
        400,
        "Multiple choice :: orther question data failed"
      );
    }
  },
  updateAnswerData: async function ({ _id, answer_data }) {
    try {
      await MultipleChoice.findByIdAndUpdate(_id, {
        answer_data,
      });
    } catch (err) {
      throw createHttpError(
        400,
        "Multiple choice :: update question data failed"
      );
    }
  },
};

export default MultipleChoiceService;
