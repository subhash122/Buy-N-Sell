const User = require("../models/userModel");
const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "name", "email", "phoneNo");
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.getAllFavourites = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.user._id).populate("favourites");
  res.status(200).json({
    status: "success",
    favourites: user.favourites,
  });
});

exports.addToFavourites = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: { favourites: req.body.id },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    user,
  });
});

exports.deleteFromFavourites = catchAsync(async (req, res, next) => {
  let user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { favourites: req.body.id },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    user,
  });
});
