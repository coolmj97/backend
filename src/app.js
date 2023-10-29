require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const { PORT, MONGO_URI } = process.env;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// RESTful API route for DB
const userRouter = require("./routes/user");
const feedRouter = require("./routes/feed");
const commentRouter = require("./routes/comment");

app.use("/users", userRouter);
app.use("/feeds", feedRouter);
app.use("/comments", commentRouter);

// DB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Successfully connected to mongodb"))
  .catch((e) => console.log(e));

// Default route for server status
app.get("/", (req, res) => {
  res.json({ message: `Server is running on port ${PORT}` });
});

// Set listen port for request
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
