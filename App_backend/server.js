const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./config.env" });
const app = require("./app");

const port = process.env.PORT || 4000;
const uri = process.env.DB.replace("<password>", process.env.DB_PASSWORD);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"));

app.listen(port, () => {
  console.log(`node app running at port:${port}`);
});
