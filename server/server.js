const express = require("express");
const morgan = require("morgan");
const app = express();
const errorHandler = require("./middlewares/errors");
const MusicTransferError = require("./helpers/errorHelper").MusicTransferError;
const authRoutes = require("./routes/auth/authRoutes");

require("./env/env");
//Body parser
app.use(express.json());
app.use(morgan("combined"));

//Routes
app.use(authRoutes);
app.all("*", (req, res, next) => {
  next(new MusicTransferError("Internal Server Error", 500));
});

app.use(errorHandler);
app.listen(process.env.PORT || 3030, () =>
  console.log(`Started listening on ${process.env.PORT}`)
);
