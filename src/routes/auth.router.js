import { Router, query } from "express";
import passport from "passport";
import config from "../configs/index.js";
import { ensureAuthenticated } from "../middlewares/auth.mdw.js";
import { AuthController } from "../controllers/index.js";

const AuthRouter = Router();

const clientUrl = config.auth.clientUrl;

AuthRouter.get("/google", (req, res, next) => {
  req.session.return_uri = req.query.return_uri || clientUrl;
  passport.authenticate("google", {
    scope: ["profile", "email"],
    failureRedirect: clientUrl,
  })(req, res, next);
});
AuthRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: clientUrl,
  }),
  AuthController.googleCallBack
);
AuthRouter.get("/logout", ensureAuthenticated, AuthController.logOut);
AuthRouter.get("/profile", ensureAuthenticated, AuthController.profile);
AuthRouter.get("/refreshtoken", AuthController.refreshToken);

export default AuthRouter;
