import { MultipleChoiceService } from "../services/index.js";
import _ from "lodash";

const MultipleChoiceController = {
  addQuestionData: async function (req, res, next) {
    try {
      const _id = _.get(req, "params.id");
      const option = await MultipleChoiceService.addQuestionData({ _id });
      res.fly({
        status: 200,
        message: "MultipleChoiceController :: Add question data successfuly",
        metadata: { option },
      });
    } catch (err) {
      next(err);
    }
  },
  deleteQuestionData: async function (req, res, next) {
    try {
      const _id = _.get(req, "params.id");
      const optionId = _.get(req, "params.optionId");
      await MultipleChoiceService.deleteQuestionData({ _id, optionId });
      res.fly({
        status: 200,
        message: "MultipleChoiceController :: Delete question data successfuly",
      });
    } catch (err) {
      next(err);
    }
  },
  updateAnswerData: async function (req, res, next) {
    try {
      const _id = _.get(req, "params.id");
      const answer_data = _.get(req, "body.answer_data");
      await MultipleChoiceService.updateAnswerData({ _id, answer_data });
      res.fly({
        status: 200,
        message: "MultipleChoiceController :: Update answer data successfuly",
      });
    } catch (err) {
      next(err);
    }
  },
};

export default MultipleChoiceController;
