const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const errorHandler = require('./middlewares/errors');
const spotifyRoutes = require('./routes/spotify/index');
const HttpErrors = require('./constants/httpErrors');

require('./config/env');
//Body parser
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());
//Routes
app.use(spotifyRoutes);

app.all('*', (req, res, next) => {
  err = {
    message: `Route ${req.originalUrl} does not exist`,
    statusCode: HttpErrors.NOT_FOUND,
  };
  next(err);
});
app.use(errorHandler);
app.listen(process.env.PORT, () => console.log(`Started listening on ${process.env.PORT || 3030}`));
