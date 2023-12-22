import { QuestionService } from "../services/index.js";
import _ from "lodash";

const FormController = {
  update: async function (req, res, next) {
    try {
      const _id = _.get(req, "params.id");
      const { key, value } = _.get(req, "body");
      console.log({ _id, key, value });
      await QuestionService.update({ _id, key, value });
      res.fly({
        status: 200,
        message: "Successed to update question",
      });
    } catch (err) {
      next(err);
    }
  },
};

export default FormController;
