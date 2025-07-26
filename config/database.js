const mongoose = require("mongoose");
const {DB_URl}= process.env;

const dbConnection = () => {
  console.log(DB_URl)
  mongoose
    .connect(DB_URl)
    // .then((conn) => {
    //   console.log(`Database connected: ${conn.connection.host}`);
    // })
    // .catch((err) => {
    //   console.log("Database connection failed", err);
    // });
};

module.exports = dbConnection;


// Username:  mohamedaasharif
// Password:  o02coOUTTuu10ogw

// mongodb+srv://mohamedaasharif:o02coOUTTuu10ogw@nodejsproject.fg3gm1w.mongodb.net/NodeJSProject?retryWrites=true&w=majority&appName=NodeJSProject