import jwt from "jsonwebtoken";
import config from "../configs/index.js";
import createHttpError from "http-errors";
import { Token, User } from "../models/index.js";
import _ from "lodash";
import { pickUserProfile } from "../utils/index.js";

const ACCESS_SECRECT_KEY = config.jwt.ACCESS_SECRECT_KEY;
const REFRESH_SECRECT_KEY = config.jwt.REFRESH_SECRECT_KEY;
const ACCESS_EX = config.jwt.ACCESS_EX;
const REFRESH_EX = config.jwt.REFRESH_EX;
const JWTService = {
  access: {
    sign: (payload) => {
      try {
        payload = pickUserProfile(payload);
        return jwt.sign(payload, ACCESS_SECRECT_KEY, {
          expiresIn: ACCESS_EX,
          algorithm: "HS256",
        });
      } catch {
        return "";
      }
    },
    verify: (token) => {
      try {
        return jwt.verify(token, ACCESS_SECRECT_KEY);
      } catch {
        throw createHttpError(400);
      }
    },
  },
  refresh: {
    sign: async (payload, user) => {
      try {
        payload = pickUserProfile(payload);
        const userExists = await User.findOne({ id: user });
        if (!userExists) {
          await User.create(payload);
        } else {
          payload = pickUserProfile(userExists);
        }
        const token = jwt.sign(payload, REFRESH_SECRECT_KEY, {
          expiresIn: REFRESH_EX,
          algorithm: "HS256",
        });
        const expiresAt = new Date(Date.now() + REFRESH_EX * 1000);
        await Token.findOneAndUpdate(
          { user },
          {
            token,
            user,
            expiresAt,
          },
          { upsert: true }
        );
        return token;
      } catch {
        return "";
      }
    },
    verify: async (tokenString) => {
      try {
        const refreshToken = jwt.verify(tokenString, REFRESH_SECRECT_KEY);
        const storedRefreshToken = await Token.findOne({
          user: refreshToken.id,
          token: tokenString,
        });
        if (!storedRefreshToken || storedRefreshToken.expiresAt < new Date()) {
          return null;
        }
        return refreshToken;
      } catch {
        return null;
      }
    },
    delete: async (user) => {
      await Token.deleteOne({ user });
    },
  },
  refreshToken: async function (refreshTokenString) {
    try {
      if (!refreshTokenString) {
        throw createHttpError(403, "No refreshToken");
      }
      const validRefreshToken = await JWTService.refresh.verify(
        refreshTokenString
      );
      if (!validRefreshToken) {
        throw createHttpError(403, "RefreshToken invalid");
      }
      const accessToken = await JWTService.access.sign(
        pickUserProfile(validRefreshToken)
      );
      if (!accessToken) {
        throw createHttpError(403, "Can not create access token");
      }
      return accessToken;
    } catch (err) {
      throw createHttpError(err);
    }
  },
};

export default JWTService;
