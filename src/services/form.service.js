import { Form, Question } from "../models/index.js";
import { SettingService, SecurityService } from "./index.js";
import createHttpError from "http-errors";
import { QuestionService } from "./index.js";
import {
  questionTypeHasQuestionData,
  questionTypeArray,
} from "../const/questionType.const.js";
import _ from "lodash";

const FormService = {
  find: async function ({ id, owner }) {
    let form = null;
    try {
      form = await Form.findOne({ _id: id, owner });
    } catch (err) {
      throw createHttpError(404, `Not found form with id ${id}`);
    }
    if (!form) {
      throw createHttpError(404, `Not found form with id ${id}`);
    }
    return form;
  },
  create: async function ({ owner }) {
    const [setting, security] = await Promise.all([
      SettingService.createDefault(),
      SecurityService.createDefault(),
    ]);
    try {
      const form = await Form.create({
        owner,
        setting: setting._id,
        security: security._id,
      });
      return form;
    } catch (err) {
      throw createHttpError(400, "Create form failed");
    }
  },
  get: async function ({ id, owner }) {
    let form = null;
    try {
      form = await Form.findById(id)
        .populate("setting")
        .populate("security")
        .populate({
          path: "questions",
          populate: {
            path: "data",
            populate: _.map(questionTypeArray, (questionType) => {
              const populate = [];
              questionType.hasQuestionData && populate.push("question_data");
              questionType.hasAnswerData && populate.push("answer_data");
              return {
                path: questionType.type,
                populate,
              };
            }),
          },
        })
        .exec();
    } catch {
      throw createHttpError(404, `Not found form with id ${id}`);
    }
    if (!form) {
      throw createHttpError(404, `Not found form with id ${id}`);
    }
    if (form?.owner != owner) {
      throw createHttpError(
        403,
        "There is no permission to retrieve data from this form"
      );
    }
    return form;
  },
  addQuestion: async function ({ id, owner, type, index }) {
    const form = await this.find({ id, owner });
    let question = await QuestionService.createDefault({ type });
    try {
      index++;
      let newQuestionsArray = _.clone(form.questions);
      form.questions = [
        ...newQuestionsArray.slice(0, index),
        question._id,
        ...newQuestionsArray.slice(index),
      ];
      await form.save();
      question = await Question.findById(question._id)
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
      return question;
    } catch (err) {
      throw createHttpError(400, "Add question failed");
    }
  },
};
export default FormService;
