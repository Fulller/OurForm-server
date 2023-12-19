import { Router } from "express";
import responseMDW from "../middlewares/response.mdw.js";
import notFoundMDW from "../middlewares/notFound.mdw.js";
import { ensureAuthenticated } from "../middlewares/auth.mdw.js";
import handleErrorMDW from "../middlewares/handleError.mdw.js";
import AuthRouter from "./auth.router.js";
import FormRouter from "./form.router.js";
import SettingRouter from "./setting.router.js";

const route = Router();
route.use(responseMDW);
route.use("/ping", (req, res) => {
  res.fly({ status: 200, message: "Pong" });
});

route.use("/auth", AuthRouter);
route.use("/api", route);
route.use("/form", ensureAuthenticated, FormRouter);
route.use("/setting", ensureAuthenticated, SettingRouter);
route.use(notFoundMDW);
route.use(handleErrorMDW);

export default route;
