const fs = require("fs");
const Product = require("../models/productModel");

const { importDb, deleteDb } = require("./seed");

const obj = {
  product: { m: Product, filePath: `${__dirname}/product.json` },
};

const list = JSON.parse(
  fs.readFileSync(obj[process.argv[3]].filePath, "utf8")
);

if (process.argv[2] === "--import") {
  importDb(obj[process.argv[3]].m, list);
} else if (process.argv[2] === "--delete") {
  deleteDb(obj[process.argv[3]].m);
}