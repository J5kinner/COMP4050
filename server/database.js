require('dotenv').config()
const mongoose = require("mongoose");
const { mongoURI } = require("./config/keys");

let URI = mongoURI

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  
mongoose.connection
.once("open", () => console.log("Connected to database: ", URI))
.on("error", (err) => console.log(err));

const UserSchema = require("./models/users");
const FavourSchema = require("./models/favours");

module.exports = {
  UserSchema,
  FavourSchema
}