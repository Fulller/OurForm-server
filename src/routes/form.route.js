import { Router } from "express";
import { FormController } from "../controllers/index.js";

const FormRouter = Router();

FormRouter.post("/create", FormController.create);
FormRouter.get("/get/:id", FormController.get);
FormRouter.post("/question/add/:id/:type", FormController.addQuestion);
FormRouter.delete(
  "/question/delete/:id/:question_id",
  FormController.deleteQuestion
);
FormRouter.patch("/question/update/:id", FormController.updateIndexQuestions);

export default FormRouter;
