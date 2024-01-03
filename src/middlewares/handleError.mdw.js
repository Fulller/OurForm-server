export default (err, req, res, next) => {
  res.fly({
    status: err.status || 500,
    message: err.message,
  });
};
