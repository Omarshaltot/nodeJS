require("dotenv").config();

const dbConnection = require("../config/database");
dbConnection();

exports.importDb = (m, l) => {
  m.create(l).then(() => {
    console.log("data imported");
  }).catch(() => {
    console.log("Error");
  }).finally(() => {
    process.exit();
  });
};

exports.deleteDb = (m) => {
  m.deleteMany().then(() => {
    console.log("deleted");
  }).catch(() => {
    console.log("Error");
  }).finally(() => {
    process.exit();
  });
};
console.log(process.argv)