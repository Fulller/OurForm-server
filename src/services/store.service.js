import { Store, Form, FormResponse } from "../models/index.js";
import createHttpError from "http-errors";
import _ from "lodash";

const StoreService = {
  create: async function (owner) {
    if (!owner) {
      throw createHttpError(400, "Has not owner for create store!");
    }
    try {
      const store = await Store.findOne({ owner }).lean();
      if (!store) {
        await Store.create({ owner });
      }
    } catch (err) {
      throw createHttpError(400, "Create store failed!");
    }
  },
  get: async function (userId) {
    if (!userId) {
      throw createHttpError(400, "Has not owner for create store!");
    }
    try {
      const promiseArray = [
        Store.findOne({ owner: userId })
          .populate({ path: "recently", populate: "setting" })
          .populate({ path: "favourite", populate: "setting" })
          .exec(),
        Form.find({ owner: userId }).populate("setting").exec(),
        FormResponse.find({ responder: userId })
          .populate({ path: "form", populate: "setting" })
          .exec(),
      ];
      return await Promise.all(promiseArray);
    } catch (err) {
      throw createHttpError(400, "Get store failed!");
    }
  },
  addRecently: async function (owner, formId) {
    try {
      formId = formId.toString();
      const store = await Store.findOne({ owner });
      store.recently = _.chain(store.recently)
        .map((form) => form.toString())
        .without(formId)
        .concat(formId)
        .uniq()
        .value();
      await store.save();
    } catch (err) {
      throw createHttpError(400, "Add recenty form failed!");
    }
  },
};
export default StoreService;
