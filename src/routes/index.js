import { Router } from "express";
import responseMDW from "../middlewares/response.mdw.js";
import notFoundMDW from "../middlewares/notFound.mdw.js";
import { ensureAuthenticated } from "../middlewares/auth.mdw.js";
import handleErrorMDW from "../middlewares/handleError.mdw.js";
import AuthRouter from "./auth.router.js";
import FormRouter from "./form.router.js";
import SettingRouter from "./setting.router.js";
import QuestionRouter from "./question.router.js";
import MultipleChoiceRouter from "./multiple_choice.router.js";
import OptionRouter from "./option.router.js";

const route = Router();
route.use(responseMDW);
route.use("/ping", (req, res) => {
  res.fly({ status: 200, message: "Pong" });
});

route.use("/auth", AuthRouter);
route.use("/api", ensureAuthenticated, route);
route.use("/form", FormRouter);
route.use("/setting", SettingRouter);
route.use("/question", QuestionRouter);
route.use("/multiple_choice", MultipleChoiceRouter);
route.use("/option", OptionRouter);

route.use(notFoundMDW);
route.use(handleErrorMDW);

export default route;
