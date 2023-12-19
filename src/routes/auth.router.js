import { Router, query } from "express";
import passport from "passport";
import config from "../configs/index.js";
import {
  profileAuthenticated,
  ensureAuthenticated,
} from "../middlewares/auth.mdw.js";
import { AuthController } from "../controllers/index.js";

const AuthRouter = Router();

const clientUrl = config.auth.clientUrl;

AuthRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
AuthRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: clientUrl + "/login",
  }),
  AuthController.googleCallBack
);
AuthRouter.get("/logout", ensureAuthenticated, AuthController.logOut);
AuthRouter.get("/profile", ensureAuthenticated, AuthController.profile);
AuthRouter.get("/refreshtoken", AuthController.refreshToken);

export default AuthRouter;
