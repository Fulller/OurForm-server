import { Router } from "express";
import { SettingController } from "../controllers/index.js";

const SettingRouter = Router();

SettingRouter.patch("/update", SettingController.update);

export default SettingRouter;
