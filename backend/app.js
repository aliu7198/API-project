const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

// checks environment key in config file
// isProduction will be true if env is in production
const { environment } = require("./config");
const isProduction = environment === "production";

// initialize express app
const app = express();

// morgan middleware logs info about req and res
app.use(morgan("dev"));
// parses cookies
app.use(cookieParser());
// parses JSON bodies of requests
app.use(express.json());

// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

// connect all the routes
app.use(routes);
// ...

module.exports = app;
