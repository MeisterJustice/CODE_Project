
exports.getUsers = async (req, res, next) => {
  try {
    return res.status(200).json({message: "success"});
  } catch (err) {
    return next(err);
  }
};