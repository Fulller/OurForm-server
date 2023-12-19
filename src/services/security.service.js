import { Security } from "../models/index.js";

const SecurityService = {
  createDefault: async function () {
    const security = await Security.create({
      lock: false,
      activated: false,
      password: null,
      time: null,
      duration: null,
      end_time: null,
    });
    return security;
  },
};
export default SecurityService;
