const Photo = require("../models/photo");
const cloudinary = require("../services/cloudinary");
const fs = require("fs");

exports.createPhoto = async (req, res, next) => {
  try {
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      let files = req.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const result = await cloudinary.uploadImageWithPublicId(
          file.path,
          "photos",
          req.body.title + "-" + Date.now()
        );

        imageUrls.push(result.url);

        fs.unlinkSync(file.path);
      }
      req.body.photo = imageUrls[0];
    } else {
      return next({
        status: 400,
        message: "photos required",
      });
    }

    let photo = await new Photo({ ...req.body }).save();

    res.status(201).json({
      status: "success",
      message: "photo uploaded successfully",
      data: photo,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPhotos = async (req, res, next) => {
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

    const photos = await Photo.find({ ...options }, null, {
      ...filter,
    })
      .select({ ...select })
      .lean()
      .exec();

    res.status(200).json({
      status: "success",
      message: "photos successfully fetched",
      data: photos,
    });
  } catch (err) {
    next(err);
  }
};
