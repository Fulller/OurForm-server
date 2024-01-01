import { Router } from "express";
import { OptionController } from "../controllers/index.js";

const OptionRouter = Router();

OptionRouter.patch("/:id/update", OptionController.update);

export default OptionRouter;
