import { Router } from "express";
import { MultipleChoiceController } from "../controllers/index.js";

const MultipleChoiceRouter = Router();

MultipleChoiceRouter.post(
  "/:id/question_data/add",
  MultipleChoiceController.addQuestionData
);
MultipleChoiceRouter.delete(
  "/:id/question_data/delete/:optionId",
  MultipleChoiceController.deleteQuestionData
);
MultipleChoiceRouter.patch(
  "/:id/answer_data/update",
  MultipleChoiceController.updateAnswerData
);

export default MultipleChoiceRouter;
