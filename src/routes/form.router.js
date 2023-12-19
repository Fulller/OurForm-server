import { Router, query } from "express";
import { profileAuthenticated } from "../middlewares/auth.mdw.js";
import { FormController } from "../controllers/index.js";

const FormRouter = Router();

FormRouter.post("/create", FormController.create);
FormRouter.get("/get/:id", FormController.get);
FormRouter.post("/question/add/:id/:type", FormController.addQuestion);

export default FormRouter;
