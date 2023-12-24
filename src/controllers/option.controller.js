import { OptionService } from "../services/index.js";
import _ from "lodash";

const OptionController = {
  update: async function (req, res, next) {
    try {
      const _id = _.get(req, "params.id");
      const { text, image } = _.get(req, "body");
      await OptionService.update({ _id, text, image });
      res.fly({
        status: 200,
        message: "Successed to update options",
      });
    } catch (err) {
      next(err);
    }
  },
};

export default OptionController;
