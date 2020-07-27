const express = require("express");
const morgan = require("morgan");
const app = express();
const errorHandler = require("./middlewares/errors");
const spotifyRoutes = require("./routes/spotify/index");
const HttpErrors = require("./constants/httpErrors");

require("./config/env");
//Body parser
app.use(express.json());
app.use(morgan("combined"));

//Routes
app.use(spotifyRoutes);

app.all("*", (req, res, next) => {
  next(
    new MusicTransferError(
      `Route ${req.originalUrl} does not exist`,
      HttpErrors.NOT_FOUND
    )
  );
});
app.use(errorHandler);
app.listen(process.env.PORT, () =>
  console.log(`Started listening on ${process.env.PORT || 3030}`)
);
