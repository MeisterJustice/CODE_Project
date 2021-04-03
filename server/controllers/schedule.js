const Schedule = require("../models/schedule");

exports.createSchedule = async (req, res, next) => {
  try {
    let schedule = await new Schedule({ ...req.body }).save();

    res.status(201).json({
      status: "success",
      message: "schedule created successfully",
      data: schedule,
    });
  } catch (err) {
    next(err);
  }
};

exports.getSchedule = async (req, res, next) => {
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

    if (req.query.name) {
      options.dateAndTime = req.query.dateAndTime;
    }

    if (req.query.scheduleId) {
      options._id = req.query.scheduleId;
    }

    if (req.query.startDate && req.query.endDate) {
      options.dateAndTime = {
        $gte: new Date(
          new Date(decodeURIComponent(req.query.startDate)).setHours(00, 00, 00)
        ),
        $lt: new Date(
          new Date(decodeURIComponent(req.query.endDate)).setHours(23, 59, 59)
        ),
      };
    }

    const schedule = await Schedule.find({ ...options }, null, {
      ...filter,
    })
      .select({ ...select })
      .sort({ dateAndTime: "asc" })
      .lean()
      .exec();

    res.status(200).json({
      status: "success",
      message: "schedule successfully fetched",
      data: schedule,
    });
  } catch (err) {
    next(err);
  }
};
