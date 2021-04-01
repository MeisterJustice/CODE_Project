const User = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { jwt_secret } = require("../config/index");

exports.signup = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;

    let user = await User.create({
      name,
      email,
      password,
      isAdmin: true,
    });

    let { id, isAdmin } = user;
    let token = jwt.sign(
      {
        id,
        name,
        isAdmin,
        email,
      },
      jwt_secret
    );

    return res.status(201).json({
      id,
      name,
      isAdmin,
      email,
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "email already exist";
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.signin = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({
      email,
    });
    let { id, name, isAdmin } = user;
    let isMatch = await user.comparePassword(password);
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          name,
          email,
          isAdmin,
        },
        jwt_secret
      );
      return res.status(200).json({
        id,
        name,
        email,
        isAdmin,
        token,
      });
    } else {
      return next({
        status: 400,
        message: "Invalid password",
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: "Invalid email or password",
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    let filter = {};
    let select = {};
    let options = {};

    if (req.query.limit) {
      filter.limit = parseInt(req.query.limit);
    }

    if (req.query.skip) {
      filter.skip = parseInt(req.query.skip);
    }

    if (req.query.select) {
      let selectArray = [...req.query.select.split(",")];
      for (let i = 0; i < selectArray.length; i++) {
        select[`${selectArray[i]}`] = 1;
      }
    }

    if (req.query.userId) {
      options._id = req.query.userId;
    }

    if (req.query.isAdmin) {
      options.isAdmin = true;
    }

    const user = await User.find({ ...options }, null, { ...filter })
      .select({ ...select })
      .lean()
      .exec();

    res.status(200).json({
      status: "success",
      message: "user successfully fetched",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return next({
        status: 400,
        message: "user required",
      });
    }

    const update = { ...req.body };

    let user = await User.findOne({ _id: userId });

    if (!user) {
      return next({
        status: 400,
        message: "no such user",
      });
    }

    user = await User.updateOne(
      { _id: userId },
      {
        $set: {
          ...update,
        },
      }
    );

    if (user.nModified == 1) {
      user = await User.findOne({ _id: userId });

      res.status(200).json({
        status: "success",
        message: "user updated successfully",
        data: user,
      });
    } else {
      return next({
        status: 500,
        message: "an error occured",
      });
    }
  } catch (err) {
    next(err);
  }
};
