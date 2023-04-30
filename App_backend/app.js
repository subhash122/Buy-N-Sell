const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/products", productRouter);
app.use("/users", userRouter);

app.use(globalErrorHandler);
module.exports = app;
