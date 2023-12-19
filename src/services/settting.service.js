import { Setting } from "../models/index.js";
import createHttpErrors from "http-errors";
import _ from "lodash";

const SettingService = {
  createDefault: async function () {
    const setting = await Setting.create({
      title: null,
      describe: null,
      image: null,
    });
    return setting;
  },
  update: async function (setting) {
    try {
      await Setting.updateOne(
        { _id: _.get(setting, "_id") },
        _.pick(setting, ["title", "describe"]),
        { new: true }
      );
    } catch (err) {
      throw createHttpErrors(400, "Update settings failed");
    }
  },
};
export default SettingService;
