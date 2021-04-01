const cloudinary = require("cloudinary").v2;
const accessEnv = require("./accessEnv");
const AppError = require("./errorUtil");

cloudinary.config({
  cloud_name: accessEnv("CLOUD_NAME"),
  api_key: accessEnv("CLOUD_API_KEY"),
  api_secret: accessEnv("CLOUD_API_SECRET"),
});

module.exports.uploadImage = (imagePath, folder) => {
  return new Promise((res, rej) => {
    cloudinary.uploader.upload(
      imagePath,
      { use_filename: true, folder },
      (err, result) => {
        if (err) return rej(err);
        res(result);
      }
    );
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw new AppError(err);
    });
};
module.exports.uploadImageWithPublicId = (imagePath, folder, identifier) => {
  return new Promise((res, rej) => {
    cloudinary.uploader.upload(
      imagePath,
      { public_id: identifier, folder },
      (err, result) => {
        if (err) return rej(err);
        res(result);
      }
    );
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw new AppError(err);
    });
};

module.exports.deleteImage = (imagePublicId) => {
  return new Promise((res, rej) => {
    cloudinary.uploader.destroy(imagePublicId, (err, result) => {
      if (err) return rej(err);
      res(result);
    });
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw new AppError(err);
    });
};

module.exports.searchImage = (imageName) => {
  return new Promise((res, rej) => {
    cloudinary.search
      .expression(`folder=profileImages AND filename=${imageName}*`)
      .execute()
      .then((result) => {
        res(result);
      });
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw new AppError(err);
    });
};

module.exports.getDigitalAssets = ({
  giftCard,
  giftCardName,
  country,
  countryName,
}) => {
  return new Promise((res, rej) => {
    if (giftCard && giftCardName) {
      cloudinary.search
        .expression(`folder=mediaFiles/giftCard AND filename =${giftCardName}*`)
        .execute()
        .then((result) => {
          res(result);
        });
    } else if (giftCard && !giftCardName) {
      cloudinary.search
        .expression(`folder=mediaFiles/giftCard`)
        .execute()
        .then((result) => {
          res(result);
        });
    } else if (country && countryName) {
      cloudinary.search
        .expression(
          `folder=mediaFiles/countryFlags AND filename=${countryName}*`
        )
        .execute()
        .then((result) => {
          res(result);
        });
    } else if (country && !countryName) {
      cloudinary.search
        .expression(`folder=mediaFiles/countryFlags`)
        .execute()
        .then((result) => {
          res(result);
        });
    }
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw new AppError(err);
    });
};
