import { Router } from "express";
import { QuestionController } from "../controllers/index.js";

const QuestionRouter = Router();

QuestionRouter.patch("/update/:id", QuestionController.update);

export default QuestionRouter;
