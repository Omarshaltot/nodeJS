const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((conn) => {
      console.log(`Database connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log("Database connection failed", err);
    });
};

module.exports = dbConnection;


// Username:  mohamedaasharif
// Password:  o02coOUTTuu10ogw

// mongodb+srv://mohamedaasharif:o02coOUTTuu10ogw@nodejsproject.fg3gm1w.mongodb.net/NodeJSProject?retryWrites=true&w=majority&appName=NodeJSProject