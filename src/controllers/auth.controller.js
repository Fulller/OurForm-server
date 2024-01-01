import config from "../configs/index.js";
import _ from "lodash";
import createHttpError from "http-errors";
import { JWTService } from "../services/index.js";
import { pickUserProfile } from "../utils/index.js";

const clientUrl = config.auth.clientUrl;

export default {
  googleCallBack: async (req, res) => {
    const reqUser = req.user;
    const id = _.get(reqUser, "id");
    let user = {
      id: _.get(reqUser, "id"),
      name: _.get(reqUser, "displayName"),
      email: _.get(reqUser, "emails[0].value"),
      avatar: _.get(reqUser, "photos[0].value"),
      provider: "google",
    };
    const accessToken = await JWTService.access.sign(user);
    const refreshToken = await JWTService.refresh.sign(user, id);
    res.redirect(
      `${clientUrl}/auth?accesstoken=${accessToken}&refreshtoken=${refreshToken}`
    );
  },
  logOut: async (req, res, next) => {
    try {
      const userId = _.get(req, "profile.id", "");
      await JWTService.refresh.delete(userId);
      res.fly({ status: 200, message: "Logout successful" });
    } catch (err) {
      next(err);
    }
  },
  profile: async (req, res) => {
    const profile = req.profile;
    res.fly({
      status: profile ? 200 : 400,
      metadata: {
        profile: profile ? pickUserProfile(profile) : null,
      },
    });
  },
  refreshToken: async (req, res, next) => {
    try {
      const refreshToken = _.get(req.headers, "refreshtoken", "");
      if (!refreshToken) {
        throw createHttpError(403);
      }
      const accessToken = await JWTService.refreshToken(refreshToken);
      res.fly({ status: 200, metadata: { accessToken } });
    } catch (err) {
      next(err);
    }
  },
};
