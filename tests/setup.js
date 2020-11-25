require("../models/User");
const mongoose = require("mongoose");
const keys = require("../config/keys");

//in case tests take too long, but aren't failing on the content
jest.setTimeout(30000)

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });
