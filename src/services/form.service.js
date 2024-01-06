import { Form, Question } from "../models/index.js";
import { SettingService, SecurityService } from "./index.js";
import createHttpError from "http-errors";
import { QuestionService } from "./index.js";
import {
  questionTypeHasQuestionData,
  questionTypeArray,
  questionType,
} from "../const/questionType.const.js";
import _ from "lodash";

const FormService = {
  find: async function ({ _id, owner }) {
    let form = null;
    try {
      form = await Form.findOne({ _id, owner });
    } catch (err) {
      throw createHttpError(404, `Not found form with id ${id}`);
    }
    if (!form) {
      throw createHttpError(404, `Not found form with id ${id}`);
    }
    return form;
  },
  create: async function ({ owner }) {
    const [setting, security, question] = await Promise.all([
      SettingService.createDefault(),
      SecurityService.createDefault(),
      QuestionService.createDefault({
        type: questionType.multiple_choice.type,
      }),
    ]);
    try {
      const form = await Form.create({
        owner,
        setting: setting._id,
        security: security._id,
        questions: [question._id],
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
  addQuestion: async function ({ _id, owner, type, index }) {
    const form = await this.find({ _id, owner });
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
      question = await QuestionService.findByIdAndPopulate(question._id);
      return question;
    } catch (err) {
      throw createHttpError(400, "FormService :: Add question failed");
    }
  },
  deleteQuestion: async function ({ _id, owner, questionId }) {
    await QuestionService.delete({ _id: questionId });
    const form = await this.find({ _id, owner });
    try {
      form.questions = form.questions.filter(
        (_questionId) => _questionId != questionId
      );
      await form.save();
    } catch (err) {
      throw createHttpError(400, "FormService :: delete question failed");
    }
  },
  updateIndexQuestions: async function ({ _id, owner, questions }) {
    const form = await this.find({ _id, owner });
    try {
      form.questions = questions;
      await form.save();
    } catch (err) {
      throw createHttpError(400, "FormService :: update index question failed");
    }
  },
  updateOtherQuestionsByIndex: async function ({ _id, owner, index, action }) {
    const form = await this.find({ _id, owner });
    let actionNum = 0;
    try {
      switch (action) {
        case "UP": {
          if (index == 0) {
            throw createHttpError(
              400,
              "FormService :: Update other question by index falied because invalid index"
            );
          }
          actionNum--;
          break;
        }
        case "DOWN": {
          if (index == form.questions.length - 1) {
            throw createHttpError(
              400,
              "FormService :: Update other question by index falied because invalid index"
            );
          }
          actionNum++;
          break;
        }
        default:
          return;
      }
      const questions = Array.from(form.questions);
      const movedItem = questions.splice(index, 1)[0];
      questions.splice(index + actionNum, 0, movedItem);
      form.questions = questions;
      await form.save();
    } catch (err) {
      throw createHttpError(err);
    }
  },
};
export default FormService;
