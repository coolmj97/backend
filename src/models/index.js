// const mongoose = require("mongoose");

// const userSchema = require("./user")(mongoose);
// const feedSchema = require("./feed")(mongoose);
// const commentSchema = require("./comments")(mongoose);

// const User = mongoose.model("user", userSchema);
// const Feed = mongoose.model("feed", feedSchema);
// const Comments = mongoose.model("comment", commentSchema);

// module.exports = { User, Feed, Comments };

require("dotenv").config();
const mongoose = require("mongoose");

// Use Node.js native promise
mongoose.Promise = global.Promise;

const { MONGO_URI } = process.env;

const db = {};
db.mongoose = mongoose;
db.url = MONGO_URI;
db.user = require("./user")(mongoose);
db.feed = require("./feed")(mongoose);
db.comment = require("./comment")(mongoose);

module.exports = db;
