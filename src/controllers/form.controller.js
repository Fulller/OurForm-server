import { FormService } from "../services/index.js";
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
      const form = await FormService.get({ id, owner });
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
      const id = _.get(req, "params.id", null);
      const owner = _.get(req, "profile.id", null);
      const type = _.get(req, "params.type", null);
      const index = _.get(req, "body.index");
      const question = await FormService.addQuestion({
        id,
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
};

export default FormController;
