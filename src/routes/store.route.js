import { Router } from "express";
import { StoreController } from "../controllers/index.js";

const StoreRouter = Router();

StoreRouter.get("/get", StoreController.get);

export default StoreRouter;
