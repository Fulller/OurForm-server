import { FormService, StoreService } from "../services/index.js";
import _ from "lodash";

const FormController = {
  create: async function (req, res, next) {
    try {
      const owner = _.get(req, "profile.id", null);
      const form = await FormService.create({ owner });
      res.fly({
        status: 200,
        message: "Successed to create form",
        metadata: { form },
      });
    } catch (err) {
      next(err);
    }
  },
  get: async function (req, res, next) {
    try {
      const id = _.get(req, "params.id", null);
      const owner = _.get(req, "profile.id", null);
      const [form] = await Promise.all([
        FormService.get({ id, owner }),
        StoreService.addRecently(owner, id),
      ]);
      res.fly({
        status: 200,
        message: "Get form successfuly",
        metadata: { form },
      });
    } catch (err) {
      next(err);
    }
  },
  addQuestion: async function (req, res, next) {
    try {
      const _id = _.get(req, "params.id", null);
      const owner = _.get(req, "profile.id", null);
      const type = _.get(req, "params.type", null);
      const index = _.get(req, "body.index");
      const question = await FormService.addQuestion({
        _id,
        owner,
        type,
        index,
      });
      res.fly({
        status: 200,
        message: "Add question successfuly",
        metadata: { question },
      });
    } catch (err) {
      next(err);
    }
  },
  deleteQuestion: async function (req, res, next) {
    try {
      const _id = _.get(req, "params.id", null);
      const owner = _.get(req, "profile.id", null);
      const questionId = _.get(req, "params.question_id", null);
      await FormService.deleteQuestion({
        _id,
        owner,
        questionId,
      });
      res.fly({
        status: 200,
        message: "Delete question successfuly",
      });
    } catch (err) {
      next(err);
    }
  },
  updateIndexQuestions: async function (req, res, next) {
    try {
      const _id = _.get(req, "params.id", null);
      const owner = _.get(req, "profile.id", null);
      const questions = _.get(req, "body.questions", []);
      await FormService.updateIndexQuestions({
        _id,
        owner,
        questions,
      });
      res.fly({
        status: 200,
        message: "Update index questions successfuly",
      });
    } catch (err) {
      next(err);
    }
  },
  updateOtherQuestionsByIndex: async function (req, res, next) {
    try {
      const _id = _.get(req, "params.id", null);
      const owner = _.get(req, "profile.id", null);
      const { index, action } = _.get(req, "body");
      await FormService.updateOtherQuestionsByIndex({
        _id,
        owner,
        index,
        action,
      });
      res.fly({
        status: 200,
        message: "Update orther question by index successfuly",
      });
    } catch (err) {
      next(err);
    }
  },
};

export default FormController;
