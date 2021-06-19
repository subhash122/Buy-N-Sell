const Product = require("../models/productModel");

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  sort() {
    if (this.queryString.sort) {
      if (this.queryString.sort == "priceIncreasing") {
        this.query = this.query.sort("price");
      }
      if (this.queryString.sort == "priceDecreasing") {
        this.query = this.query.sort("-price");
      }
    }
    return this;
  }

  limitCategory() {
    if (this.queryString.category) {
      this.query = this.query.where({ category: this.queryString.category });
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const skip = (page - 1) * 9;
    this.query = this.query.skip(skip).limit(9);

    return this;
  }
}
module.exports = APIFeatures;
