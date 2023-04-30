const Product = require("../models/productModel");
const { google } = require('googleapis');
const multer = require("multer");
const fs = require('fs');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const { PassThrough } = require("stream");

let upload = multer({
  storage: multer.memoryStorage()
});

exports.uploadImage = upload.any();

exports.createProduct = catchAsync(async (req, res, next) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: './googleCredentials.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  const service = google.drive({ version: 'v3', auth });
  const uploadedFilesArr = await Promise.all(req.files.map((curItem) => {
    let fileToUpload = new PassThrough().end(curItem.buffer)
    return service.files.create({                   //uploads file to google drive folder and returns metadata of file
      requestBody: {
        name: `${curItem.fieldname + '_' + Date.now() + '_' + curItem.originalname}`,
        parents: [process.env.GOOGLE_API_FOLDER_ID]
      },
      media: {
        mimeType: `${curItem.mimetype}`,
        body: fileToUpload,
      }
    });
  }));

  req.images = [];
  uploadedFilesArr.forEach((uploadedFile) => {
    req.images.push(`https://drive.google.com/uc?export=view&id=${uploadedFile.data.id}`)
  })
  const newProduct = await Product.create({
    ...req.body,
    images: [...req.images],
    seller: req.user._id,
    active: true,
  });
  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.productId).populate(
    "seller"
  );
  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.getAll = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.user) filter = { seller: req.user._id };
  const features = new APIFeatures(
    Product.find(filter).where({ active: true }),
    req.query
  )
    .sort()
    .limitCategory()
    .paginate();
  const allProducts = await features.query;
  let countProducts;
  if (req.query.category) {
    countProducts = await Product.find({
      category: req.query.category,
      active: true,
    }).countDocuments();
  } else {
    countProducts = await Product.find({ active: true }).countDocuments();
  }
  res.status(200).json({
    status: "success",
    countProducts,
    data: {
      products: allProducts,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.productId);
  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  if (String(product.seller) != String(req.user._id)) {
    return next(new AppError("you are not owner of this product", 401));
  }
  product = await Product.findByIdAndUpdate(
    { _id: req.params.productId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.productId);
  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  if (String(product.seller) != String(req.user._id)) {
    return next(new AppError("you are not owner of this product", 401));
  }
  product = await Product.findByIdAndUpdate(
    { _id: req.params.productId },
    {
      active: false,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});
