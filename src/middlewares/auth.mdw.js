import { JWTService } from "../services/index.js";

export async function ensureAuthenticated(req, res, next) {
  try {
    const accessToken = req.headers["accesstoken"]?.toString() || "";
    let profile = await JWTService.access.verify(accessToken);
    req.profile = profile;
    next();
  } catch {
    res.fly({ status: 403 });
  }
}
