const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser")

// const restricted = require('./auth/restricted-middleware');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/user-router');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(cookieParser())


server.use('/api/auth', authRouter)
server.use("/api/users",  usersRouter);


server.get("/", (req, res) => {
  res.status(200).json({
      message: "Server is up and running"})
});

module.exports = server;

