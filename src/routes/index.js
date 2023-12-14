import { Router } from "express";
import responseMDW from "../middlewares/response.mdw.js";
import notFoundMDW from "../middlewares/notFound.mdw.js";
import handleErrorMDW from "../middlewares/handleError.mdw.js";
import AuthRouter from "./auth.router.js";
const route = Router();
route.use(responseMDW);
route.use("/ping", (req, res) => {
  res.fly({ status: 200, message: "Pong" });
});
route.use("/auth", AuthRouter);
route.use(notFoundMDW);
route.use(handleErrorMDW);
export default route;
