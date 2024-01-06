import { StoreService } from "../services/index.js";
import _ from "lodash";

const StoreController = {
  get: async function (req, res, next) {
    try {
      const userId = _.get(req, "profile.id", null);
      const [{ recently, favourite }, form, form_response] =
        await StoreService.get(userId);
      return res.fly({
        status: 200,
        message: "Get store successfuly",
        metadata: { store: { recently, favourite, form, form_response } },
      });
    } catch (err) {
      next(err);
    }
  },
};
export default StoreController;
