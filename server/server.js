const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
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

app.use((err, req, res, next) => {
  let error = '';

  if (err.message && err.statusCode) {
    error = { status: err.statusCode, message: err.message };
  }
  if (err.response && err.response.data) {
    error = { status: err.response.status, message: err.response.data.error };
  }
  if (error.status === undefined) {
    console.log();
    error.status = 500;
    error.message = 'Internal server error';
  }
  console.log('-----------------');
  console.log(error);
  console.log('-----------------');

  res.status(error.status).json(error);
});
app.listen(process.env.PORT, () => console.log(`Started listening on ${process.env.PORT || 3030}`));
