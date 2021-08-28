module.exports = (req, res, next) => {
  console.log(`${Date.now} - ${req.Date} - ${req.hostname}`);
  next();
};
