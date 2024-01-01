import { SettingService } from "../services/index.js";
import _ from "lodash";

const SettingController = {
  update: async function (req, res, next) {
    try {
      const setting = _.pick(req.body, ["_id", "title", "describe"]);
      await SettingService.update(setting);
      res.fly({
        status: 200,
        message: "Update setting successfully",
      });
    } catch (err) {
      next(err);
    }
  },
};
export default SettingController;
