import statusObj from "../utils/status/index.js";

export default (req, res, next) => {
  res.fly = ({ status, code, message, metadata, option }) => {
    res.status(status).json({
      status: statusObj(status),
      code,
      message,
      metadata,
      option,
    });
  };
  next();
};
