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
      req.body.photos = imageUrls;
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
